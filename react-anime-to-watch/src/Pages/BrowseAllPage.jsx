// import Dropdown from 'react-bootstrap/Dropdown';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IndividualCard } from '../components/IndividualCard';
import Spinner from 'react-bootstrap/Spinner';

const getSeason = async(year, season, setAnilist) => {
    let response = await axios.post('/season_search/', {
        'year': year,
        'season': season
    })
    setAnilist(response.data.data.data)
    return response.data.data.data
}

const getCurrSeason = async(setAnilist) => {
    let response = await axios.get('/curr_season/')
    setAnilist(response.data.data.data)
}

const getUpcoming = async(setAnilist) => {
    let response = await axios.get('/upcoming/')
    setAnilist(response.data.data.data)
}

export const BrowseAllPage = () => {

    const [year, setYear] = useState(2022)
    const [season, setSeason] = useState('Fall')
    const [hidden, setHidden] = useState(true)
    const [aniList, setAnilist] = useState(null)

   useEffect(()=>{
        getCurrSeason(setAnilist)
   }, [])

    return (
        <>
        <div className='text-white' style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{marginRight: '2%', cursor: 'pointer'}} onClick={() => getCurrSeason(setAnilist)}>This Season</p>
            <p style={{marginRight: '2%', cursor: 'pointer'}} onClick={()=> getUpcoming(setAnilist)}>Upcoming Season</p>
            <p style={{cursor: 'pointer'}} onClick={() => setHidden(false)}>Season Filter</p>
        </div>

        <Form onSubmit={(e) => [e.preventDefault(), getSeason(year, season, setAnilist), setHidden(true)]}>

        <div hidden={hidden} style={{display: 'flex', justifyContent: 'center'}}>
            <Form.Select aria-label="Season" style={{maxWidth: '100px'}} size='small' onChange={(e) => setYear(e.target.value)}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
            </Form.Select>
        </div>

        <div hidden={hidden} style={{display: 'flex', justifyContent: 'center'}}>
            <Form.Select aria-label="Season" style={{maxWidth: '100px'}} size='small' onChange={(e) => setSeason(e.target.value)}>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
                <option value="Spring">Spring</option>
            </Form.Select>
        </div>
        <div hidden={hidden} style={{display: 'flex', justifyContent: 'center'}}>
            <input className="text-white" type='submit' value="Browse" style={{maxWidth: '100px', display: 'flex'}}/>
        </div>
        <div hidden={hidden} style={{display: 'flex', justifyContent: 'center'}}>
            <p className='text-white' onClick={()=> setHidden(true)} style={{cursor: 'pointer'}}>Hide</p>
        </div>
        </Form>

        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        {aniList && aniList.map((anime, idx)=>(
                <IndividualCard data={anime} id={idx}/>
            ))}
        </div>

        {!aniList && <>
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <Spinner variant='light' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        </>}

        </>
    )
}