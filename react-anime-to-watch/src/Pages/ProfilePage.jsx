import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { currUser } from "../utilities"

export const ProfilePage = () => {
    const [user, setUser] = useState({'name': null, 'profile_image': null})
    const email = user.email
    const name = user.name
    const profile_image = user.profile_image

    useEffect(()=>{
            const getCurrUser = async() =>{
            setUser(await currUser())
            }
        getCurrUser()
    }, [])

    console.log(name, email, profile_image)

    return (
        <>
        <h3 className="text-white" style={{display: 'flex', justifyContent: 'center'}}>Profile Page</h3>
            <img src={profile_image} style={{alignSelf: 'center', borderRadius: '50%'}}/>
            <div>
            <h3 className="text-white">Name: {name}</h3>
            <h3 className="text-white">Email: {email}</h3>
            </div>

            <Link to='/browse' style={{display: 'flex', justifyContent: 'center', height: '50vh'}}>Back to Browse</Link>
        </>
    )
}