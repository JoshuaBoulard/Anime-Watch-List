import { Link } from 'react-router-dom'
import image from './images/image.png'

export const ErrorPage = () => {

    return (
        <>
        <Link to="/">Back To Home</Link>
        <img src={image} style={{
        justifyContent: 'center', 
        display: "flex", 
        alignItems: "center", 
        backgroundColor: "rgb(20, 20, 20)", 
        height: "100vh"}} alt="404"/>
        </>
    )
}