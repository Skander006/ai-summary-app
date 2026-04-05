import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', async (req, res)=>{
    const { firstname, lastname, email, password } = req.body;
    if(!email || !password || !firstname || !lastname){
        return res.status(400).json({error : "Identifiants requis"});
    }
    try{
        const user = await User.create({email, password});
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"},
        );
        res.status(201).json({token, user:{id:user._id, email: user.email, firstname : user.firstname, lastname : user.lastname}});
    } catch(err){
        if(err.code === 11000){
            return res.status(409).json({error : "Email existant déjà"});
        }
        res.status(500).json({error : err.message});
    }
});


router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error : "Identifiants requis"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error : "Utilisateur non trouvé !"});
        }
        const valid = user.comparePassword(password);
        if(!valid){
            return res.status(401).json({error : "Mot de passe invalide !"});
        }
        const token = jwt.sign(
            {id : user._id, email : user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"},
        );
        res.status(200).json({token, user: {id : user._id, email : user.email, fisrtname : user.firstname, lastname : user.lastname}});
    } catch(err){
        res.status(500).json({error : err.message});
    }
});

export default router;