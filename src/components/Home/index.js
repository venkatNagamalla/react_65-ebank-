import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Headers from '../Headers'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-container">
      <Headers />
      <div className="container">
        <h1 className="card-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
