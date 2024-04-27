import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', messStatus: false, message: ''}

  onLoginSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitClick = async e => {
    e.preventDefault()
    const {userId, pin} = this.state
    const userData = {user_id: userId, pin}

    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.setState({messStatus: true, message: data.error_msg})
    }
  }

  renderForm = () => {
    const {messStatus, message, userId, pin} = this.state

    return (
      <form onSubmit={this.onSubmitClick} className="form-container">
        <div className="input-container">
          <label htmlFor="userId">User ID</label>
          <input
            onChange={e => this.setState({userId: e.target.value})}
            placeholder="Enter User ID"
            type="text"
            id="userID"
            value={userId}
          />
        </div>
        <div className="input-container">
          <label htmlFor="pin">PIN</label>
          <input
            onChange={e => this.setState({pin: e.target.value})}
            placeholder="Enter PIN"
            type="password"
            id="pin"
            value={pin}
          />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
        {messStatus && <p className="error">{message}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-img-container">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div className="login-card">
            <h1 className="heading">Welcome Back!</h1>
            {this.renderForm()}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
