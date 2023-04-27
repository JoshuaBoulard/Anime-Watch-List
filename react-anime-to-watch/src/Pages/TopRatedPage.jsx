import { useLoaderData } from "react-router"
import { IndividualCard } from "../components/IndividualCard"
import axios from "axios"


export const getBrowseAnime = async() => {
    let response = await axios.get('/browse/')
    return response.data.data.data
}

export const TopRatedPage = () => {
    const animeitems = useLoaderData()

    return (
        <>
        <h3 className="text-white" style={{display: 'flex', justifyContent: 'center'}}>Top Rated</h3>
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        {animeitems.map((anime, idx)=>(
                <IndividualCard data={anime} id={idx}/>
            ))}
        </div>
        </>
    )
}