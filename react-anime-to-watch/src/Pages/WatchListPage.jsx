import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IndividualCard } from "../components/IndividualCard";
import { makeNote } from "../utilities";
import { Link } from "react-router-dom";
import { removeAnime } from "../utilities";

export const myWatchList = async () => {
    let response = await axios.get('/user/mylist/')
    return response.data.success
}

export const WatchListPage = () => {
    const myWatched = useLoaderData()
    const [note, setNote] = useState('')
    const [hidden, setHidden] = useState(true)
    
    if (myWatched.length === 0) {
        return (
            <>
            <h3 className='text-white' style={{display: 'flex', justifyContent: 'center'}}>My Watch List</h3>
            <h3 className='text-white' style={{
                justifyContent: 'center', 
                display: "flex", 
                alignItems: "center", 
                backgroundColor: "rgb(20, 20, 20)", 
                height: "100vh"}}>
                    No Anime on your list yet!
            </h3>
            </>
        )
    } else {
    
        return (
            <>
            <h3 className='text-white' style={{display: 'flex', justifyContent: 'center'}}>My list</h3>
            {myWatched.map((anime, idx)=>(
                <div style={{display: 'flex'}}>
                    <IndividualCard data={anime.data} id={idx}/>
                    <div>
                        <h3 className="text-white">Personal Note: </h3>
                        <p className="text-white" style={{marginLeft: '20px'}}>{anime.personal_notes}</p>
                        <form style={{marginLeft: '20px'}} hidden={hidden} onSubmit={(e)=> [e.preventDefault(), makeNote(anime.title, note), setNote('')]}>
                            <input style={{backgroundColor: 'white', width: '800px'}} placeholder="personal note" value={note} onChange={(e)=> setNote(e.target.value)}/>
                            <input type="submit" value="Make/Change Note" className="text-white"/>
                            <input onClick={()=> setNote('')} type="submit" value="Delete" className="text-white"/>
                        </form>
                        <p hidden={!hidden} style={{marginLeft: '20px', cursor: 'pointer', color: 'aqua', fontSize: '15px'}} onClick={()=> setHidden(false)}>Edit Notes</p>
                        <p onClick={()=> removeAnime(anime.title)} style={{cursor: 'pointer', height: '25px', marginTop: '25vh', marginLeft: '20px', borderBottom: '2px solid white', width: '156px', color: 'crimson'}}>Remove From my List</p>
                    </div>
                </div>
            ))}
            <Link to='/browse' style={{display: 'flex', justifyContent: 'center', height: '30vh'}}>Back to Browse</Link>
            </>
        )
    }
}