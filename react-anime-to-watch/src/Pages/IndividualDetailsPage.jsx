import axios from "axios"
import { useLoaderData } from "react-router"
import { IndividualCard } from "../components/IndividualCard"

export const getAnimeDetails = async ({params}) => {
    const response = await axios.post('/animeById/', {
        'id' : params.id
    })
    console.log(response.data.data.data)
    return response.data.data.data
}

export const IndividualDetailsPage = () => {
    const anime = useLoaderData()
    return (
        <>
        <div className="text-white">
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <IndividualCard data={anime}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <p>Names:</p>
                {anime.titles.map((title) => (
                <p>{title.title},</p>
                ))}
            </div>
            <p style={{display: 'flex', justifyContent: 'center', borderBottom: '2px solid gray', borderTop: '2px solid gray'}}>{anime.synopsis}</p>
            <p>Season: {anime.season}</p>
            <p>Overall Rank: {anime.rank}</p>
            <p>Episodes: {anime.episodes}</p>
            <div style={{display: 'flex'}}>
                <p>Genre:</p>
                {anime.genres.map((title) => (
                <p>{title.name},</p>
                ))}
            </div>
            <p>{anime.rating}</p>
            <p>Trailer:</p>
            <div style={{display: 'flex', justifyContent: 'center', height: '30vh', marginBottom: '2%'}}>
            <iframe src={anime.trailer.embed_url}/>
            </div>
        </div>
        </>
    )
}