import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SignInForm from './SignInForm'
import Button from './Button'

function SignInPage({ onSignInResponse }) {
  return (
    <Fragment>
      <SignInForm onSignInResponse={ onSignInResponse }/>

      <Link to="/signup"><Button>Sign Up</Button></Link>
    </Fragment>
  )
}

export default SignInPage