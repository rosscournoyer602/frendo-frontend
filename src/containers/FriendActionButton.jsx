/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import friendAction from '../actions/friendAction';

class FriendActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      option: 0,
      optionText: ''
    };
  }

  componentDidMount() {
    const { friends, friend } = this.props;
    const match = friends.filter(f => f.person_id === friend.person_id);
    if (match.length === 0) {
      this.setState({
        disabled: false,
        optionText: 'Add',
        option: 1
      });
    }
    if (match.length === 1) {
      this.setState({
        disabled: false,
        optionText: 'Block',
        option: 3
      });
    }
    this.determineOptionText();
  }

  determineOptionText() {
    const { actionType } = this.props;
    if (actionType === 'waitingForAccept') {
      this.setState({
        disabled: true,
        optionText: 'Pending'
      });
    }
    if (actionType === 'friend') {
      this.setState({
        disabled: true,
        optionText: 'Block',
        option: 3
      });
    }
    if (actionType === 'incomingRequest') {
      this.setState({
        disabled: false,
        optionText: 'Accept',
        option: 2
      });
    }
  }

  performFriendAction() {
    const { friendAction, actionTaker, friend } = this.props;
    const { option } = this.state;
    if (this.state.optionText === 'Accept') {
      this.setState({
        optionText: 'Accepted'
      });
    }
    if (this.state.optionText === 'Add') {
      this.setState({
        optionText: 'Added'
      });
    }
    friendAction({ id1: actionTaker, id2: friend.person_id, option, actionTaker });
  }

  render() {
    return (
      <button
        type="button"
        className="btn friend-action-btn"
        disabled={this.state.disabled}
        onClick={() => this.performFriendAction()}
      >
        {this.state.optionText}
      </button>
    );
  }
}

FriendActionButton.propTypes = {
  friend: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  friendAction: PropTypes.func.isRequired,
  actionTaker: PropTypes.number.isRequired,
  actionType: PropTypes.string
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  friends: state.friends,
  actionTaker: state.currentUser.person_id
});

const mapDispatchToProps = dispatch => bindActionCreators({ friendAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendActionButton);
