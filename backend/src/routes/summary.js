import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import Groq from "groq-sdk";

const router = express.Router();

router.post('/', protect, async(req, res)=>{
    const {text} = req.body;
    if(!text) return res.status(400).json({error : "Texte requis !"});
    try{
        const groq = new Groq({apiKey : process.env.GROQ_API_KEY});
        const completion = await groq.chat.completions.create({
            model : "llama-3.3-70b-versatile",
            messages: [
                {
                    role : "system",
                    content : "Résume ce texte en moins de 3 phrases et corrige ",
                },
                {
                    role : 'user',
                    content : text,
                }
            ],
            max_tokens : 300
            }
        );
        const summary = completion.choices[0].message.content;
        res.json({summary});
    } catch(err){
        console.log("Erreur du serveur Groq !");
        res.status(400).json({error : err.message});
    }
});

export default router;