/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import searchUsers from '../actions/searchUsers';
import FriendItem from '../components/FriendItem';

class UserSearch extends Component {
  handleSearch() {
    const { searchUsers } = this.props;
    const searchInput = document.getElementById('searchInput').value;
    console.log('SEARCH', searchInput);
    searchUsers(searchInput);
  }

  render() {
    const { searchResults } = this.props;
    return (
      <>
        <form>
          <input id="searchInput" type="text" />
          <button type="button" onClick={() => this.handleSearch()}>
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
      </>
    );
  }
}

UserSearch.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchResults: state.searchResults
});

const mapDispatchToProps = dispatch => bindActionCreators({ searchUsers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch);
