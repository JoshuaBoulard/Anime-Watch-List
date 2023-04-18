// import Jumbotron from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { IndividualCard } from '../components/IndividualCard';
import axios from 'axios';
import { useLoaderData } from 'react-router';

export const getAnime = async() => {
    let response = await axios.get('/home/')
    return response.data.data.data
}

export const HomePage = () => {

    const animeitems = useLoaderData()
    

    return (
        <>
        <Carousel className="jumbotron" >

      <Carousel.Item className="jumbotron-image">
        <img
          className="d-block w-100"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bfdf36ee-9707-4809-8f87-67b882950b82/dap3y1l-ae533b96-1a9d-4589-9a75-976f2b5711de.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmZGYzNmVlLTk3MDctNDgwOS04Zjg3LTY3Yjg4Mjk1MGI4MlwvZGFwM3kxbC1hZTUzM2I5Ni0xYTlkLTQ1ODktOWE3NS05NzZmMmI1NzExZGUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1QT5DymCba29QFmnjRzMmH-C53YSYmQmCezlmVop7LQ"
          alt="First slide"
        />
       
      </Carousel.Item>
      <Carousel.Item className="jumbotron-image">
        <img
          className="d-block w-100"
          src="https://wallpaper.dog/large/20479482.jpg"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item className="jumbotron-image">
        <img
          className="d-block w-100"
          src="https://wallpapersmug.com/download/2560x1440/5d9ae0/my-hero-academia-izuku-art.jpg"
          alt="Third slide"
        />
      </Carousel.Item>

    </Carousel>
            <h2 className="text-white"style={{display: 'flex', justifyContent: 'center'}}>Welcome To Anime Watch List!</h2>
            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: '2%'}}>
                {animeitems.map((anime, idx)=>(
                    <IndividualCard data={anime} id={idx}/>
                ))}
            </div>

        </>
    )
}