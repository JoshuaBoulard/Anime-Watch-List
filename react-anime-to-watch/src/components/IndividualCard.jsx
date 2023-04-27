import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router';
import { add_to_watch } from '../utilities';
import axios from 'axios';
import { useState, useEffect } from 'react';



export const allAnime = async() => {
  const watchAnime = []
  const completedAnime = []
  let response = await axios.get('/user/allanime/')
  if (response.data.success !== false){
    for (let x in response.data.success){
      if (response.data.success[x].completed === false){
        watchAnime.push(response.data.success[x].title)
      } else {
        completedAnime.push(response.data.success[x].title)
      }
    }
    return [watchAnime, completedAnime]
  }
}

export const IndividualCard = (props) => {
    const navigate = useNavigate()
    const animeid = props.data.mal_id
    const [watchDisable, setWatchDisable] = useState(false)
    const [completeDisable, setCompleteDisable] = useState(false)
    
    
      useEffect(()=>{
        const getList = async() =>{
        let response = await allAnime()
          let watched = response[0]
          let completed = response[1]

          for (let y in watched) {
            if (watched[y] == animeid){
              setWatchDisable(true)
            }
          }

          for (let x in completed){
            if (completed[x] == animeid){
              setCompleteDisable(true)
            }
          }
        }
          getList()
        }, [])


    return (
        <>
        <Card style={{ width: '18rem', marginBottom: '2%'}} className="text-white">
      <Card.Img variant="top" src={props.data.images.jpg.image_url} onClick={() => navigate(`/anime/`+ animeid)} />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.score}/10
          <p>Click on image for more details!</p>
        </Card.Text>
      </Card.Body>
      <div style={{display: 'flex', paddingBottom: '1%', justifyContent: 'center'}}>
        <Button disabled={watchDisable} variant="dark" onClick={() => [add_to_watch(animeid, 'watch', props.data), setWatchDisable(true), setCompleteDisable(false)]}>Add to-watch</Button>
        <Button disabled={completeDisable} variant="dark" onClick={() => [add_to_watch(animeid, 'complete', props.data), setCompleteDisable(true), setWatchDisable(false)]}>Completed</Button>
        </div>
        <DropdownButton id="dropdown-item-button" title="Synopsis of This Anime!" variant='dark' style={{display: 'flex', justifyContent: 'center'}}>
      <Dropdown.ItemText className='text-white'>{props.data.synopsis}</Dropdown.ItemText>
    </DropdownButton>
        </Card>
        </>
    )
}