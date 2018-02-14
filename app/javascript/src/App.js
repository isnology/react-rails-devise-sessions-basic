import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isSignedIn, signOut } from './api/auth'
import  SignUpPage  from './components/SignUpPage'
import  SignInPage  from './components/SignInPage'
import  SignedInPage  from './components/SignedInPage'


class App extends Component {
  state = {
    text: "How are you all?",
    user: null
  }

  ifSignedIn() {
    isSignedIn()
    .then((res) => {
      this.setState({ user: res.user })
    })
  }

  onSignOut = () => {
    signOut()
    .then((res) => {
      this.setState({ user: null })
    })
    .catch((error) => {
      //res.status(404).json(error)
      console.log("error:", error)
    })
  }

  onSignInResponse = (data) => {
    this.setState({ user: data })
  }

  render() {
    const { text, user } = this.state
    const signedIn = !!user

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              !signedIn ? <Redirect to='/signin' /> : <Redirect to='/signedin' />
            )}/>

            <Route path='/signin' exact render={ () => (
              !signedIn ? <SignInPage onSignInResponse={ this.onSignInResponse }/> : <Redirect to='/signedin' />
            )}/>

            <Route path='/signup' exact render={ () => (
              !signedIn ? <SignUpPage onSignInResponse={ this.onSignInResponse }/> : <Redirect to='/signedin' />
            )}/>

            <Route path='/signedin' exact render={ () => (
              !!signedIn ? <SignedInPage onSignOut={ this.onSignOut } /> : <Redirect to='/signin' />
            )}/>

          </Switch>
        </div>
      </Router>
    )
  }

  componentWillMount() {
    this.ifSignedIn()
  }
}

export default App
