import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Button from './Button'

function SignedInPage({ signedIn, onSignOut }) {
  if (!signedIn) {return (<Redirect to="/" />)}
  return (
      <Fragment>
        <h2>Signed in</h2>
        <Button onClick={ onSignOut } >Sign Out</Button>
      </Fragment>
  )
}

export default SignedInPage