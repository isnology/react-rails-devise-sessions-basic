import React, { Component } from 'react'
import { signIn } from '../api/auth'
import Button from './Button'


class SignInForm extends Component {

  onSignInClick = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const data = {
      user: {
        email: elements.email.value,
        password: elements.password.value,
      }
    }
    return signIn(data)
    .then((res) => this.props.onSignInResponse(res))
  }

  render() {
    return (
      <form onSubmit={this.onSignInClick}>
        <div className="form-label">
        <label>
          {'Email: '}
          <input
              type='email'
              name='email'
              defaultValue=""
          />
        </label>
        </div>
        <div className="form-label">
        <label>
          {'Password: '}
          <input
              type='password'
              name='password'
              defaultValue=""
          />
        </label>
        </div>
        <br />
        <Button>Log In</Button>
      </form>
    )
  }
}

export default SignInForm
