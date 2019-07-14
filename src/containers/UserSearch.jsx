/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import searchUsers from '../actions/searchUsers';
import FriendItem from '../components/FriendItem';
import getFriends from '../actions/getFriends';
import getPerson from '../actions/getPerson';

class UserSearch extends Component {
  componentDidMount() {
    const { currentUser, getFriends, getPerson } = this.props;
    if (currentUser.email && !currentUser.person_id) {
      getPerson(currentUser.email);
    }
    if (!currentUser.email && window.localStorage.getItem('user')) {
      getPerson(window.localStorage.getItem('user'));
    }
    if (currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentUser, getFriends } = this.props;
    if (currentUser.person_id !== prevProps.currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  handleSearch() {
    const { searchUsers } = this.props;
    const searchInput = document.getElementById('searchInput').value;
    searchUsers(searchInput);
  }

  render() {
    const { searchResults } = this.props;
    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="search-page">
          <h2 className="friends-list-header">Search for friends</h2>
          <form className="search-form">
            <input className="form-text-input search-input" id="searchInput" type="text" />
            <button
              className="btn form-button search-button"
              type="button"
              onClick={() => this.handleSearch()}
            >
              Search
            </button>
          </form>
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map(friend => (
                <li key={friend.person_id}>
                  <FriendItem friend={friend} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </CSSTransition>
    );
  }
}

UserSearch.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  getPerson: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchUsers, getFriends, getPerson }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch);
