import {createHashRouter} from 'react-router-dom'
import App from './App'
import { HomePage } from './Pages/HomePage'
import { SignUp } from './Pages/SignUp'
import { ProfilePage } from './Pages/ProfilePage'
import { LogIn } from './Pages/LogIn'

export const router = createHashRouter([{
    path: '/',
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: '/user/',
            element: <ProfilePage />,
        },    
        {
            path: '/user/signup/',
            element: <SignUp />
        },
        {
            path: '/user/login/',
            element: <LogIn />
        }
    ]
}])