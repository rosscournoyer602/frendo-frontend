/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import trySignIn from '../actions/trySignIn';
import changeUpdateStatus from '../actions/changeUpdateStatus';
import Modal from '../components/Modal';

class SignIn extends Component {

  getFormValues() {
    // eslint-disable-next-line no-shadow
    const { trySignIn } = this.props;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    document.getElementById("signInForm").reset();
    // TODO - More strict field validation
    trySignIn(email, password);
	}

	componentDidMount() {
		const that = this
		document.getElementById('signInForm').addEventListener('keypress', function(e) {
			if (e.key === 'Enter') {
				that.getFormValues()
			}
		})
	}

  render() {
    const { authStatus, updateStatus } = this.props;
    if (authStatus) return <Redirect to="/" />;

    return (
      <>
        <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
          <form className="auth-form" id="signInForm">
            <div className="form-field">
              <label className="form-label" htmlFor="email">Email: </label>
            </div>
            <div className="form-field">
              <input className="form-text-input" type="text" name="email" id="email" required />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="password">Password: </label>
            </div>
            <div className="form-field">
              <input className="form-text-input" type="password" name="password" id="password" required />
            </div>
            <div className="form-field">
              <input className="btn form-button" type="button" value="Sign In" onClick={() => this.getFormValues()} />
            </div>
          </form>
        </CSSTransition>
        {updateStatus &&
          <Modal
            title="Uh Oh!"
            message="Username or password are incorrect. Try again."
            onModalOk={() => this.props.changeUpdateStatus('')}
          />
        }
      </>
    );
  }
}

SignIn.propTypes = {
  trySignIn: PropTypes.func.isRequired,
  authStatus: PropTypes.bool.isRequired,
  updateStatus: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  const { authStatus, updateStatus } = state;
  return {
    authStatus,
    updateStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  trySignIn,
  changeUpdateStatus
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
