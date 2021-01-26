import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import trySignUp from '../actions/trySignUp';
import Modal from '../components/Modal';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      errorMessage: {}
    }
	}
	
	componentDidMount() {
		const that = this
		const signUpForm = document.getElementById('signUpForm')
		if (signUpForm) {
			signUpForm.addEventListener('keypress', function(e) {
				if (e.key === 'Enter') {
					that.getFormValues()
				}
			})
		}
	}

  componentDidUpdate(prevProps) {
    const { updateStatus } = this.props;
    if (prevProps.updateStatus !== updateStatus) {
      if (updateStatus) {
        this.setState({
          error: true,
          errorMessage: {
            title: 'Whoops!',
            message: updateStatus
          }
        });
      }
    }
  }

  getFormValues() {
    // eslint-disable-next-line no-shadow
    const { trySignUp } = this.props;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // TODO - More strict field validation
    if (password === confirmPassword) {
      trySignUp(email, password, confirmPassword);
      document.getElementById("signUpForm").reset();
    }
    if (password !== confirmPassword) {
      this.setState({
        error: true,
        errorMessage: {
          title: 'Whoops!',
          message: 'The passwords do not match. Please try again.'
        }
      });
    }
  }

  render() {
    const { authStatus } = this.props;
    if (authStatus) return <Redirect to="/" />;

    return (
      <>
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <form className="auth-form" id="signUpForm">
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="email">Email: </label>
          </div>
          <div className="form-field">
            <input className="form-text-input" type="text" name="email" id="email" required />
          </div>
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="password">Password: </label>
          </div>
          <div className="form-field">
            <input className="form-text-input" type="password" name="password" id="password" required />
          </div>
          <div className="form-field form-field-label">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password: </label>
          </div>
          <div className="form-field">
            <input className="form-text-input" type="password" name="confirmPassword" id="confirmPassword" required />
          </div>
          <div className="form-field">
            <input className="btn form-button" type="button" value="Register" onClick={() => this.getFormValues()} />
          </div>
        </form>
      </CSSTransition>
      {this.state.error &&
        <Modal 
          title={this.state.errorMessage.title}
          message={this.state.errorMessage.message}
          onModalOk={() => this.setState({ error: false, errorMessage: {}})}
        />
      }
      </>
    );
  }
}

SignUp.propTypes = {
  trySignUp: PropTypes.func.isRequired,
  authStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { authStatus, updateStatus } = state;
  return {
    authStatus,
    updateStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators( { trySignUp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
