import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { changePic, currUser } from "../utilities"
import axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const getProfileImage = async() => {
    let response = await axios.get("https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10")
    return response.data
}

let resultsImage = []

export const profileSearch = async(query, setQuery) => {
    let resultsImage2 = []
    let response = await axios.get("https://rickandmortyapi.com/api/character/?name=" + query)
    let results = response.data.results
    // console.log(results)
    for (let i in results){
        resultsImage2.push(results[i].image)
    }
    // console.log(resultsImage)
    resultsImage = resultsImage2
    setQuery('')
    return results
}

export const ProfilePage = () => {
    const [user, setUser] = useState({'name': null, 'profile_image': null})
    const [hidden, setHidden] = useState(true)
    const [profilePic, setProfilePic] = useState('https://rickandmortyapi.com/api/character/avatar/1.jpeg')
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1)
    const [selectedImageIndex2, setSelectedImageIndex2] = useState(-1)
    const [myImages, setMyImages] = useState([])
    const [style, setStyles] = useState({})
    const [style3, setStyles2] = useState({})
    const [query, setQuery] = useState('')
    // const [searchRefresh, setSearchRefresh] = useState(0)
    const email = user.email
    const name = user.name
    const profile_image = user.profile_image

    useEffect(()=>{
            const getCurrUser = async() =>{
            setUser(await currUser())
            }
        getCurrUser()
    }, [])

    // console.log(profilePic)
    const style2 = {width: "140px", height: "140px", padding: "2%"}

    useEffect(()=>{
        const getImage = async() =>{
            const image = await getProfileImage()
            setMyImages(image)
    }
    getImage()
  }, [])


  useEffect(() => {
    const newStyle = {};
    myImages.forEach((_, index) => {
      if (index === selectedImageIndex) {
        newStyle[index] = { border: "5px solid blue", width: "140px", height: "140px", padding: "2%" };
      } else {
        newStyle[index] = { border: "none", width: "140px", height: "140px", padding: "2%"};
      }
    });
    setStyles(newStyle);
  }, [selectedImageIndex]);

  const handleImageClick = (idx) => {
    setSelectedImageIndex(idx)
  }

  useEffect(() => {
    const newStyle2 = {};
    resultsImage.forEach((_, index) => {
      if (index === selectedImageIndex2) {
        newStyle2[index] = { border: "5px solid blue", width: "140px", height: "140px", padding: "2%" };
      } else {
        newStyle2[index] = { border: "none", width: "140px", height: "140px", padding: "2%"};
      }
    });
    setStyles2(newStyle2);
  }, [selectedImageIndex2]);

  const handleImageClick2 = (idx) => {
    setSelectedImageIndex2(idx)
  }

//   console.log(profilePic)

    return (
        <>
        <h3 className="text-white" style={{display: 'flex', justifyContent: 'center'}}>Profile Page</h3>
            <img src={profile_image} style={{alignSelf: 'center', borderRadius: '50%'}}/>
            <p hidden={!hidden} style={{display: 'flex', justifyContent: 'center', color: 'aqua', cursor: 'pointer'}} onClick={()=> setHidden(false)}>Change Profile Pic</p>
            <div>
            <h3 className="text-white">Name: {name}</h3>
            <h3 className="text-white">Email: {email}</h3>
            </div>

            <div hidden={hidden} style={{justifyContent: "space-between"}}>
            {myImages.map((image, idx)=>(
                <img style={{...style[idx], ...style2}} className="image" id={idx} src={image.image} onClick={()=> {setProfilePic(image.image); handleImageClick(idx)}}/>
            ))}
            
            <Form className="d-flex" onSubmit={(e) => [e.preventDefault(), profileSearch(query, setQuery)]}>
            <Form.Control
              type="search"
              placeholder="Search Rick and Morty characters"
              className="me-2"
              aria-label="Search"
              value={query} 
              onChange={(e)=> setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>

          {resultsImage.map((image, idx) => (
                <img style={{...style3[idx], ...style2}} className="image" id={idx} src={image} onClick={()=> {setProfilePic(image); handleImageClick2(idx)}}/>
          ))}
            </div>
            <h5 hidden={hidden} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', border: '2px solid white'}} className="text-white" onClick={()=> changePic(profilePic)} >Change</h5>
            <h5 hidden={hidden} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', border: '2px solid white'}} className="text-white" onClick={()=> setHidden(true)}>Cancel</h5>
            <Link to='/toprated' style={{display: 'flex', justifyContent: 'center', height: '50vh'}}>To Top Rated</Link>
        </>
    )
}