import React, { Fragment } from 'react'
import SignInForm from './SignInForm'
import Button from './Button'

function SignInPage({ onSignUp, onSignInResponse }) {
  return (
    <Fragment>
      <SignInForm onSignInResponse={ onSignInResponse }/>
      <Button onClick={ onSignUp } >Sign Up</Button>
    </Fragment>
  )
}

export default SignInPage