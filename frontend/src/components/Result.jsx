import ReactMarkdown from "react-markdown";
import {useState} from "react";

export default function Result({response}){
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async ()=>{
        if(!response) return;
        await navigator.clipboard.writeText(response);
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        }, 2000);
    }
    return (
        <div className="result__container">
            <div className="result__message">
                <div className="copy__button__container">
                    <button className="copy__button" onClick={handleCopy}>{isCopied? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-copy"></i>}</button>
                </div>
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        </div>
    );
}
