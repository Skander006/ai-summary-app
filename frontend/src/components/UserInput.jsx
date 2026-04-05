

export default function UserInput({message, setMessage}){
    return(
        <textarea className="user__input"
                  placeholder="Insérez votre texte ici..."
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
        />
    )
}