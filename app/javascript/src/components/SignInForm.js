import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
    const { signedIn } = this.props

    if (signedIn) {return <Redirect to="/signedin" />}
    return (
      <Fragment>
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
        <Link to="/signup"><Button>Sign Up</Button></Link>
      </Fragment>
    )
  }
}

export default SignInForm
