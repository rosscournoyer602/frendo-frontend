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
      optionText: 'Add'
    };
  }

  componentDidMount() {
    const { friends, friend } = this.props;
    const match = friends.filter(f => f.person_id === friend.person_id);
    if (match.length === 0) {
      this.setState({
        disabled: false,
        option: 0
      });
    }
    if (match.length === 1) {
      this.setState({
        disabled: false,
        option: 1
      });
    }
    console.log('MATCH', match);
  }

  render() {
    const { friendAction, actionTaker } = this.props;
    const { option } = this.state;
    return (
      <button
        type="button"
        className="btn friend-action-btn"
        disabled={this.state.disabled}
        onClick={() => friendAction({ option, actionTaker })}
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
  actionTaker: PropTypes.number.isRequired
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
