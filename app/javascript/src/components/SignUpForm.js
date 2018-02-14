import React, { Component } from 'react'
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
    return (
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
    )
  }
}
export default SignUpForm