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
            <h3 style={{justifyContent: 'center', display: 'flex'}}>Individual Details Page</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <IndividualCard data={anime}/>
            </div>
            <div style={{display: 'flex'}}>
                <p>Names:</p>
                {anime.titles.map((title) => (
                <p>{title.title},</p>
                ))}
            </div>
            <p>{anime.synopsis}</p>
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
            <iframe src={anime.trailer.embed_url}/>
        </div>
        </>
    )
}