import React, { Component } from 'react'

export default class SignUp extends Component {
  render() {
    return (
        <form className="auth-form" action="" method="get">
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="email">Email: </label>
          </div>
          <div className="form-field">
            <input className="form-text-input" type="text" name="email" id="email" required />
          </div>
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="email">Password: </label>
            </div>
          <div className="form-field">
            <input className="form-text-input" type="password" name="password" id="password" required />
          </div>
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="email">Confirm Password: </label>
          </div>
          <div className="form-field">
            <input className="form-text-input" type="password" name="confirmPassword" id="confirmPassword" required />
          </div>
          <div className="form-field">
            <input className="form-button" type="submit" value="Subscribe!" />
          </div> 
        </form>
    )
  }
}
