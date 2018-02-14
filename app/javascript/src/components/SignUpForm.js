import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signUp } from '../api/auth'
import Button from './Button'


class SignUpForm extends Component {

  onRegistrationClick = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const data = {
      user: {
        email: elements.email.value,
        password: elements.password.value,
        password_confirmation: elements.passwordConfirmation.value,
      }
    }
    return signUp(data)
    .then((res) => this.props.onSignInResponse(res))
  }

  render() {
    const { signedIn } = this.props

    if (signedIn) {return <Redirect to="/signedin" />}
    return (
      <Fragment>
        <form onSubmit={this.onRegistrationClick}>
          <label>
            {'Email: '}
            <input
                type='email'
                name='email'
                defaultValue=""
            />
          </label>
          <label>
            {'Password: '}
            <input
                type='password'
                name='password'
                defaultValue=""
            />
          </label>
          <label>
            {'Re-type Password: '}
            <input
                type='password'
                name='passwordConfirmation'
                defaultValue=""
            />
          </label>
          <br />
          <Button>Sign Up</Button>
        </form>
        <Link to="/signin"><Button>Back to Sign In</Button></Link>
      </Fragment>
    )
  }
}
export default SignUpForm