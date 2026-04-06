import ReactMarkdown from "react-markdown";

export default function Result({response}){
    return (
        <div className="result__container">
            <div className="result__message">
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        </div>
    );
}
