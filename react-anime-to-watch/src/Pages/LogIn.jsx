import { useEffect, useState } from "react"
import { logIn } from "../utilities"
import { useNavigate } from "react-router"
import App from "../App"

export const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(null)
    const [relocate, setRelocate] = useState(null)

    const navigate = useNavigate()
    
    useEffect(()=>{
        if(relocate !== null){
            navigate('/browse')
            window.location.reload()
        }
    }, [relocate])


    return (<>
        <div style={{justifyContent: 'center', 
       display: "flex", 
       alignItems: "center", 
       backgroundColor: "rgb(20, 20, 20)", 
       height: "100vh"}}>

        <form style={{display: 'flex', flexDirection: 'column', width: "50%"}} onSubmit={(e)=> [e.preventDefault(), logIn(email, password, setInvalid, setRelocate)]}>
            <h3 className="text-center text-white">Login</h3>
            <input style={{backgroundColor: 'white'}} placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input style={{backgroundColor: 'white'}} type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <input type="submit" value="Login" className="text-white"/>
            {invalid && <h3 className="text-white text-center">Incorrect Username or password!</h3>}
        </form>
        
        </div>
        
        </>
    )
}