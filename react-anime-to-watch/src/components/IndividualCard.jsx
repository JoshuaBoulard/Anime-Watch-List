import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router';
import { add_to_watch } from '../utilities';
import { useState, useEffect } from 'react';
// import Accordion from 'react-bootstrap/Accordion'
// import { getAnime } from '../Pages/HomePage';

export const IndividualCard = (props) => {
    const navigate = useNavigate()
    const animeid = props.data.mal_id

    return (
        <>
        <Card style={{ width: '18rem'}} className="text-white">
      <Card.Img variant="top" src={props.data.images.jpg.image_url} onClick={() => navigate(`/anime/`+ animeid)} />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.score}/10
          <p>Click on image for more details!</p>
        </Card.Text>
      </Card.Body>
      <div style={{display: 'flex', paddingBottom: '1%', justifyContent: 'center'}}>
        <Button variant="dark" onClick={() => add_to_watch(animeid, 'watch', props.data)}>Add to-watch</Button>
        <Button variant="dark" onClick={() => add_to_watch(animeid, 'complete', props.data)}>Completed</Button>
        </div>
        <DropdownButton id="dropdown-item-button" title="Synopsis of This Anime!" variant='dark' style={{display: 'flex', justifyContent: 'center'}}>
      <Dropdown.ItemText className='text-white'>{props.data.synopsis}</Dropdown.ItemText>
    </DropdownButton>
        </Card>
        </>
    )
}