import React, { Fragment } from 'react'
import SignUpForm from './SignUpForm'
import Button from './Button'

function SignUpPage({ onBack, onSignInResponse }) {
  return (
    <Fragment>
      <SignUpForm onSignInResponse={ onSignInResponse }/>
      <Button onClick={ onBack } >Back to Sign In</Button>
    </Fragment>
  )
}

export default SignUpPage