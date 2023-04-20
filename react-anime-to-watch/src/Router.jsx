import {createHashRouter} from 'react-router-dom'
import App from './App'
import { getAnime, HomePage } from './Pages/HomePage'
import { SignUp } from './Pages/SignUp'
import { ProfilePage } from './Pages/ProfilePage'
import { LogIn } from './Pages/LogIn'
import { BrowsePage, getBrowseAnime } from './Pages/BrowsePage'
import { myWatchList, WatchListPage } from './Pages/WatchListPage'
import { CompletedPage, myCompletedList } from './Pages/CompletedPage'
import { search, SearchResultsPage } from './Pages/SearchResultsPage'
import { ErrorPage } from './Pages/ErrorPage'
import { getAnimeDetails, IndividualDetailsPage } from './Pages/IndividualDetailsPage'

export const router = createHashRouter([{
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <HomePage />,
            loader: getAnime
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
        },
        {
            path: '/browse/',
            element: <BrowsePage />,
            loader: getBrowseAnime
        },
        {
            path: '/mylist/',
            element: <WatchListPage />,
            loader: myWatchList
        },
        {
            path: '/mycompleted/',
            element: <CompletedPage />,
            loader: myCompletedList
        },
        {
            path: '/search/:query',
            element: <SearchResultsPage />,
            loader: search
        },
        {
            path: '/anime/:id',
            element: <IndividualDetailsPage />,
            loader: getAnimeDetails
        }
    ]
}])