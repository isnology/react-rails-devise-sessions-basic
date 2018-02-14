import React, { Component } from 'react'
import _      from 'lodash'
import { signIn, signUp } from '../api/auth'

class SignUpForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  onInputChange = (ev) => {
    // Get a deep clone of the component's state before the input change.
    let nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[ev.target.name] = ev.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  onRegistrationClick = (e) => {
    const data = {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
      }
    }
    return signUp(data)
    .then((res) => this.props.onSignInResponse(res))
  }

  render() {
    return (
        <form>
          <input type='email'
                 name='email'
                 placeholder='email'
                 value={this.state.email}
                 onChange={this.onInputChange} />

          <input type='password'
                 name='password'
                 placeholder='password'
                 value={this.state.password}
                 onChange={this.onInputChange} />

          <input type='password'
                 name='passwordConfirmation'
                 placeholder='re-type password'
                 value={this.state.passwordConfirmation}
                 onChange={this.onInputChange} />

          <input onClick={this.onRegistrationClick} defaultValue="sign up"/>
        </form>
    )
  }
}
export default SignUpForm