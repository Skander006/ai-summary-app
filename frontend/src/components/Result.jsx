

export default function Result({response}){
    return (
        <div className="result__container">
            <div className="result__message">
                <p className="result__content">{response}</p>
            </div>
        </div>
    );
}
