import axios from "axios";


export const signUp = async(name, email, password, profile_image, setInvalid, setRelocate) => {
    console.log(profile_image)
    let response = await axios.post('/user/signup/' , {
        'name' : name,
        'email' : email,
        'password': password,
        'profile_image': profile_image
    })
    console.log(response.data.success)
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
    console.log(response.data.Logout)
    return response.data.Logout
}