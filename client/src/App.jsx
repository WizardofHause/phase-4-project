import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [places, setPlaces] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    fetch('/authorized_user')
      .then((r) => {
        if (r.ok) {
          r.json()
            .then((user) => {
              updateUser(user);
              fetchPlaces()
            });
        }
      })
  }, [])

  const fetchPlaces = () => {
    fetch('/places')
      .then((r) => {
        if (r.ok) {
          r.json().then(setPlaces)
        } else {
          r.json().then(data => setErrors(data.error))
        }
      })
  }

  const updateUser = (user) => setCurrentUser(user)

  if (errors) return <h1>{errors}</h1>

  return (
    <>
      <Login updateUser={updateUser} />
      <div>{currentUser}</div>
      <div>{places}</div>
    </>
  )
}

export default App
