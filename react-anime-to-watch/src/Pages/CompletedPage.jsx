import axios from "axios"
import { Button } from "bootstrap"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { IndividualCard } from "../components/IndividualCard"
import { makeNote, removeAnime } from "../utilities"
import { Link } from "react-router-dom"

export const myCompletedList = async () => {
    let response = await axios.get('/user/mycompleted/')
    return response.data.success
}

export const CompletedPage = () => {
    const myCompleted = useLoaderData()
    const [note, setNote] = useState('')
    
    if (myCompleted.length === 0) {
        return (
            <>
            <h3 className='text-white' style={{display: 'flex', justifyContent: 'center'}}>My Completed</h3>
            <h3 className='text-white' style={{
                justifyContent: 'center', 
                display: "flex", 
                alignItems: "center", 
                backgroundColor: "rgb(20, 20, 20)", 
                height: "100vh"}}>
                    No Anime completed yet!
            </h3>
            </>
        )
    } else {
        return (
            <>
            <h3 className='text-white' style={{display: 'flex', justifyContent: 'center'}}>My Completed</h3>
            {myCompleted.map((anime, idx)=>(
                <div style={{display: 'flex'}}>
                    <IndividualCard data={anime.data} id={idx}/>
                    <div>
                        <h3 className="text-white">Personal Note: </h3>
                        <p className="text-white">{anime.personal_notes}</p>
                        <form onSubmit={(e)=> [e.preventDefault(), makeNote(anime.title, note), setNote('')]}>
                            <input style={{backgroundColor: 'white'}} placeholder="personal note" value={note} onChange={(e)=> setNote(e.target.value)}/>
                            <input type="submit" value="Make/Change Note" className="text-white"/>
                            <input onClick={()=> setNote('')} type="submit" value="Delete" className="text-white"/>
                        </form>
                    </div>
                    <p className="text-white" onClick={()=> removeAnime(anime.title)} style={{cursor: 'pointer', height: '5px'}}>Remove From my List</p>
                </div>
                ))}
                <Link to='/browse' style={{display: 'flex', justifyContent: 'center', height: '20vh'}}>Back to Browse</Link>
            </>
        )
    }
}