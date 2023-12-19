import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPath extends Component {
  state = {username: '', password: '', errorMsg: '', isFailed: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successfulLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureLogin = errorMsg => {
    this.setState(prevState => ({isFailed: !prevState.isFailed, errorMsg}))
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginObj = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginObj),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      this.successfulLogin(data.jwt_token)
    } else {
      this.failureLogin(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isFailed} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <main>
        <div className="form-container">
          <form onSubmit={this.onSubmit} className="form-element">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={this.onChangeUsername}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.onChangePassword}
            />

            <button type="submit">login</button>
            {isFailed && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </main>
    )
  }
}

export default LoginPath
