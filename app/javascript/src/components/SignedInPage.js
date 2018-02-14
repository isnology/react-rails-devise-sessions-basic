import React, { Fragment } from 'react'
import Button from './Button'

function SignedInPage({ onSignOut }) {
  return (
      <Fragment>
        <h2>Signed in</h2>
        <Button onClick={ onSignOut } >Sign Out</Button>
      </Fragment>
  )
}

export default SignedInPage