import React, { Component, Fragment } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isSignedIn, signOut } from './api/auth'
import  SignUpPage  from './components/SignUpPage'
import  SignInPage  from './components/SignInPage'
import  SignedInPage  from './components/SignedInPage'
//import { createBrowserHistory } from 'history'


class App extends Component {
  state = {
    text: "How are you all?",
    action: "signIn",
    user: null
  }

  //history = createBrowserHistory()

  ifSignedIn() {
    isSignedIn()
    .then((res) => {
      this.setState({ user: res.user })
    })
  }

  onSignUp = () => {
    this.setState({ action: "signUp" })
  }

  onBack = () => {
    this.setState({ action: "signIn" })
  }

  onSignOut = () => {
    signOut()
    .then((res) => {
      this.setState({ action: "signIn", user: null })
    })
    .catch((error) => {
      //res.status(404).json(error)
      console.log("error:", error)
    })
  }

  onSignInResponse = (data) => {
    console.log("sign in response:", JSON.stringify(data) )
    this.setState({ user: data })
  }

  render() {
    const { text, user, action } = this.state
    const signedIn = !!user

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <Redirect to='/app' />
            )}/>

            <Route path='/app' exact render={ () => (
                <Fragment>
                  { !signedIn && action === "signIn" &&
                  <SignInPage onSignUp={ this.onSignUp } onSignInResponse={ this.onSignInResponse }/>
                  }
                  { !signedIn && action === "signUp" &&
                  <SignUpPage onBack={ this.onBack } onSignInResponse={ this.onSignInResponse }/>
                  }
                  { !!signedIn &&
                  <SignedInPage onSignOut={ this.onSignOut } />
                  }
                </Fragment>
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
