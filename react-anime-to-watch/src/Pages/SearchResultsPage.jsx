import { useLoaderData } from "react-router"
import axios from "axios"
import { IndividualCard } from "../components/IndividualCard"


export const search = async ({params}) => {
    const response = await axios.post('/search/', {
        'query': params.query
    })
    console.log(response.data.data.data)
    return response.data.data.data
}

export const SearchResultsPage = () => {
    const anime = useLoaderData()
    const empty = anime[0]
    return (
        <>
        <h3 className="text-white" style={{display: 'flex', justifyContent: 'center'}}>Search Results</h3>
        {!empty && <h3 className="text-white" style={{
        justifyContent: 'center', 
        display: "flex", 
        alignItems: "center", 
        backgroundColor: "rgb(20, 20, 20)", 
        height: "100vh"}}>
        Couldn't find anything!</h3>}
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: '2%'}}>
        {anime.map((anime, idx) => (
            <IndividualCard data={anime} id={idx}/>
        ))}
        </div>
        </>
    )
}