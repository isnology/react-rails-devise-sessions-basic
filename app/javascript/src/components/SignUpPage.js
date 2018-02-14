import React, { Fragment } from 'react'
import SignUpForm from './SignUpForm'
import { Link } from 'react-router-dom'
import Button from './Button'

function SignUpPage({ onSignInResponse }) {
  return (
    <Fragment>
      <SignUpForm onSignInResponse={ onSignInResponse }/>

      <Link to="/signin"><Button>Back to Sign In</Button></Link>
    </Fragment>
  )
}

export default SignUpPage