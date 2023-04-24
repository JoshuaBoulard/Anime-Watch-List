import axios from "axios";


export const signUp = async(name, email, password, profile_image, setInvalid, setRelocate) => {
    console.log(profile_image)
    let response = await axios.post('/user/signup/' , {
        'name' : name,
        'email' : email,
        'password': password,
        'profile_image': profile_image
    })
    if (response.data.success === false){
        setInvalid(true)
    } else {
        setRelocate(true)
    }
}

export const logIn = async(email, password, setInvalid, setRelocate) => {

    let response = await axios.post('/user/login/', {
        'email' : email,
        "password": password
    })
    if (response.data.login === false){
        setInvalid(true)
    } else {
        setRelocate(true)
    }
}

export const currUser = async() => {
    let response = await axios.get('/user/curruser/')
    return response.data
}

export const logOut = async() => {
    let response = await axios.post('/user/logout/')
    return response.data.Logout
}

export const add_to_watch = async (anime_id, action, data) => {
    let response = await axios.post('/user/add-to-watch/', {
        'title' : anime_id,
        'action': action, 
        'data' : data
    })
    if (response.data.added === false){
        alert('Login or Signup to add to your list!')
    } else {
        alert('Added succesfully')
    }
    
}

export const makeNote = async(title, note) => {
    let response = await axios.post('/user/make_note/', {
        'title' : title,
        'note': note
    })
    if (response.data.success === true){
        window.location.reload()
    } else {
        alert('Something went wrong!')
    }
}

export const removeAnime = async(title) => {
    let response = await axios.post('/user/remove_anime/', {
        'title' : title
    })
    if (response.data.success === true){
        window.location.reload()
    } else {
        alert('something went wrong!')
    }
}

export const changePic = async(image) => {
    let response = await axios.post('/user/changePic/', {
        'image': image
    })
    if (response.data.success === true){
        window.location.reload()
    } else {
        alert("Something went wrong!")
    }
}