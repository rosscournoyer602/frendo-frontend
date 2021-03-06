/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';
import ProfileDisplay from '../components/ProfileDisplay';
import UpdateInfo from './UpdateInfo';
import getPerson from '../actions/getPerson';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: 'profile'
    };
  }

  componentDidMount() {
    const { currentUser, getPerson } = this.props;
    if (!currentUser.id) {
      getPerson(window.localStorage.getItem('user'));
    }
  }

  componentDidUpdate() {
		const { currentUser } = this.props;
		if (currentUser.id) {
			getPerson(currentUser.id);
		}
  }

  toggleDisplay(displayMode) {
    this.setState({
      displayMode
    });
  }

  render() {
    const { displayMode } = this.state;
    const { currentUser } = this.props;
    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="profile-page">
          <div className="profile-toggle">
            <button
              className={`btn ${displayMode === 'profile' ? 'selected' : ''}`}
              type="button"
              onClick={() => this.toggleDisplay('profile')}
            >
              View
            </button>
            <button
              className={`btn ${displayMode === 'update' ? 'selected' : ''}`}
              type="button"
              onClick={() => this.toggleDisplay('update')}
            >
              Update
            </button>
          </div>
          <CSSTransition
            in={displayMode === 'profile'}
            timeout={500}
            classNames="left"
            unmountOnExit
          >
            <ProfileDisplay currentUser={currentUser} />
          </CSSTransition>
          <CSSTransition
            in={displayMode === 'update'}
            timeout={500}
            classNames="right"
            unmountOnExit
          >
            <UpdateInfo backToProfile={() => this.toggleDisplay('profile')} />
          </CSSTransition>
        </div>
      </CSSTransition>
    );
  }
}

Profile.propTypes = {
  getPerson: PropTypes.func.isRequired,
  currentUser: PropTypes.any.isRequired
};

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ getPerson }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
