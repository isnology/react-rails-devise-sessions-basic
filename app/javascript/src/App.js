import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isSignedIn, signOut } from './api/auth'
import  SignUpForm  from './components/SignUpForm'
import  SignInForm  from './components/SignInForm'
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
              <Redirect to='/signin' />
            )}/>

            <Route path='/signin' exact render={ () => (
              <SignInForm signedIn={ signedIn } onSignInResponse={ this.onSignInResponse }/>
            )}/>

            <Route path='/signup' exact render={ () => (
              <SignUpForm signedIn={ signedIn } onSignInResponse={ this.onSignInResponse }/>
            )}/>

            <Route path='/signedin' exact render={ () => (
              <SignedInPage signedIn={ signedIn } onSignOut={ this.onSignOut } />
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
