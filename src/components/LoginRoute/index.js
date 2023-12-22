import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitFailure = msg => {
    this.setState({errorMsg: msg})
  }

  submitSuccess = jwtToken => {
    console.log(jwtToken)
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApi = `https://apis.ccbp.in/login`
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-bg-container">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/dqyqjbuku/image/upload/v1671000600/OBJECTS_2_y62d2l.png"
            alt="website login"
            className="website-login-image"
          />

          <div className="form-elements-container">
            <img
              src="https://res.cloudinary.com/dqyqjbuku/image/upload/v1670935866/InstaShareIcon_lzrhwf.jpg"
              alt="website logo"
              className="loginLogo"
            />
            <h1>insta share</h1>

            <form className="form-container" onSubmit={this.submitForm}>
              <div className="username-container">
                <label htmlFor="usernameElement" className="label-element">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="usernameElement"
                  className="input-element"
                  placeholder="Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="username-container">
                <label htmlFor="passwordElement" className="label-element">
                  Password
                </label>
                <input
                  type="password"
                  id="passwordElement"
                  className="input-element"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <p className="error-msg">{errorMsg}</p>
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
