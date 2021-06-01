import { useState, useEffect } from 'react'
import '../App.css'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import Page404 from './Page404'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { useAuth } from '../contexts/AuthContext'
import {
  getMatchedUsers,
  calculateDistance,
  sortByDistance,
} from '../helpers/getSearchResults'
import useLocalStorage from '../customHooks/useLocalStorage'
import { getUserById } from '../helpers/getUserById'
import { errorToast } from './ToastNotification'

const App = () => {
  const [geolocation, setGeolocation] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [orderedMatches, setOrderedMatches] = useLocalStorage(
    'orderedMatches',
    []
  )
  const history = useHistory()
  const { currentUser, logout } = useAuth()
  const [thisUserProfile, setThisUserProfile] = useState()

  useEffect(() => {
    if (currentUser) {
      const getProfile = async () => {
        const doc = await getUserById(currentUser.uid)
        setThisUserProfile(doc.data())
      }
      getProfile()
    }
  }, [currentUser])

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const getSearchResults = async (activity) => {
    if (!geolocation) {
      errorToast(
        'Sorry, something went wrong. Please check you have location enabled and refresh your browser.'
      )
      return
    }
    const userList = await getMatchedUsers(activity)
    const listWithoutCurrentUser = userList.filter(
      (user) => user.uid !== currentUser.uid
    )
    const userDistance = calculateDistance(geolocation, listWithoutCurrentUser)
    const sortedMatches = sortByDistance(userDistance)
    setOrderedMatches(sortedMatches)
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setOrderedMatches([])
    try {
      await logout()
      history.push('/')
    } catch {
      console.log('Failed to log out')
    }
  }

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition((position) => {
            setGeolocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          })
        } else if (result.state === 'denied') {
          errorToast(
            'NBRLY needs your location to work. Please update your browser preferences.'
          )
        }
      })
    } else {
      errorToast('Sorry, your browser is not compatible with NBRLY.')
    }
  }

  useEffect(() => {
    updateLocation()
  }, [])

  return (
    <div className="App">
      {currentUser && (
        <SideBar
          isOpen={isOpen}
          toggle={toggle}
          handleLogout={handleLogout}
          currentUserUid={currentUser.uid}
        />
      )}
      {currentUser && (
        <NavBar
          toggle={toggle}
          handleLogout={handleLogout}
          currentUserUid={currentUser.uid}
        />
      )}
      <Switch>
        <Route exact path="/">
          {currentUser ? <Redirect to="/Home" /> : <Login />}
        </Route>
        <Route exact path="/Home">
          <Home
            updateLocation={updateLocation}
            getSearchResults={getSearchResults}
            orderedMatches={orderedMatches}
          />
        </Route>
        <Route path="/Profile/:userID">
          <Profile
            geolocation={geolocation}
            updateLocation={updateLocation}
            orderedMatches={orderedMatches}
            thisUserProfile={thisUserProfile}
          />
        </Route>
        <Route exact path="/Signup">
          <Signup geolocation={geolocation} updateLocation={updateLocation} />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default withRouter(App)
