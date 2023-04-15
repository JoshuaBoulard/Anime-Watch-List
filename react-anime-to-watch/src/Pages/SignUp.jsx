import axios from "axios";
import { useEffect, useState } from "react";
import { signUp } from "../utilities";
import { useNavigate } from "react-router";

export const getProfileImage = async() => {
    let response = await axios.get("https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10")
    return response.data
}

export const SignUp = () => {
    const [myImages, setMyImages] = useState([])
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('https://rickandmortyapi.com/api/character/avatar/1.jpeg')
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1)
    const [style, setStyles] = useState({})

    const [invalid, setInvalid] = useState(null)
    const [relocate, setRelocate] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(relocate !== null){
            navigate('/user/login')
        }
    }, [relocate])

    const style2 = {width: "140px", height: "140px", padding: "2%"}

    useEffect(()=>{
        const getImage = async() =>{
            const image = await getProfileImage()
            setMyImages(image)
    }
    getImage()
  }, [])


  useEffect(() => {
    const newStyle = {};
    myImages.forEach((_, index) => {
      if (index === selectedImageIndex) {
        newStyle[index] = { border: "5px solid blue", width: "140px", height: "140px", padding: "2%" };
      } else {
        newStyle[index] = { border: "none", width: "140px", height: "140px", padding: "2%"};
      }
    });
    setStyles(newStyle);
  }, [selectedImageIndex]);

  const handleImageClick = (idx) => {
    setSelectedImageIndex(idx)
  }

    return (
        <>
       <div style={{justifyContent: 'center', 
       display: "flex", 
       alignItems: "center", 
       backgroundColor: "rgb(20, 20, 20)", 
       height: "100vh"}}>

        <form onSubmit={(e) => [
            e.preventDefault(), 
            signUp(name,email,password,profilePic,setInvalid,setRelocate)]} 
            style={{display: 'flex', flexDirection: 'column', width: "50%"}}>

            <h3 className="text-center text-white">Sign Up</h3>
            <input placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
            <input placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <input type="submit" value="Sign Up"/>

            {invalid && <h3 className="text-white text-center">Email is either invalid or taken!</h3>}

            <h5 style={{paddingTop: "2%"}}className="text-center text-white">Select an image for a profile pic!</h5>

        <div style={{justifyContent: "space-between"}}>
            {myImages.map((image, idx)=>(
                <img style={{...style[idx], ...style2}} className="image" id={idx} src={image.image} onClick={()=> {setProfilePic(image.image); handleImageClick(idx)}}/>
            ))}
        </div>   
        </form>
        </div>
        </>
    )
}

// {border: "none", width: "140px", height: "140px", padding: "2%"}
// , width: "140px", height: "140px", padding: "2%"