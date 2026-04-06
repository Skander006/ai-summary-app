import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import Groq from "groq-sdk";

const router = express.Router();

router.post('/short', protect, async(req, res)=>{
    const {text} = req.body;
    if(!text) return res.status(400).json({error : "Texte requis !"});
    try{
        const groq = new Groq({apiKey : process.env.GROQ_API_KEY});
        const completion = await groq.chat.completions.create({
            model : "llama-3.3-70b-versatile",
            messages: [
                {
                    role : "system",
                    content : "Résume ce texte en moins de 3 phrases en version courte et corrige ",
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

router.post('/detailed', protect, async(req,res)=>{
    const {text} = req.body;
    if(!text){
        return res.status(400).json({error : "Texte requis !"});
    }
    try{
        const groq = await new Groq({apiKey : process.env.GROQ_API_KEY});
        const completion = await groq.chat.completions.create({
            model : "llama-3.3-70b-versatile",
            messages : [
                {
                    role : "system",
                    content : "Résume ce texte en version détaillée et corrigée",
                },
                {
                    role : "user",
                    content : text,
                }
            ],
            max_tokens : 500,
        });
        const summary = completion.choices[0].message.content;
        res.json({summary});
    } catch(err){
        res.status(400).json({error : err.message});
    }
});


router.post('/bullet', protect, async(req,res)=>{
    const {text} = req.body;
    if(!text){
        return res.status(400).json({error : "Texte requis !"});
    }
    try{
        const groq = await new Groq({apiKey : process.env.GROQ_API_KEY});
        const completion = await groq.chat.completions.create({
            model : "llama-3.3-70b-versatile",
            messages : [
                {
                    role : "system",
                    content : "Résume ce texte en bullet points, en corrigeant s'il y'a des erreurs."
                },
                {
                    role : "user",
                    content : text,
                }
            ],
            max_tokens : 500,
        });
        const summary = completion.choices[0].message.content;
        res.json({summary});
    } catch(error){
        res.status(400).json({error : error.message});
    }
});

export default router;