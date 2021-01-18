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
import updateSearch from '../actions/updateSearch';

class UserSearch extends Component {
	componentDidMount() {
		const that = this
    const { currentUser, getFriends, getPerson, updateSearch, friends } = this.props;
    updateSearch([]);
    if (!currentUser.id) {
      getPerson(localStorage.getItem('user'));
    }
    if (currentUser.id) {
      getFriends(currentUser.id);
		}
		const searchform = document.getElementById('searchform')
		searchform.addEventListener('keypress', function(e) {
			if (e.key === 'Enter') {
				e.preventDefault()
				that.handleSearch()
			}
		})
  }

  componentDidUpdate(prevProps) {
    const { currentUser, getFriends } = this.props;
    if (currentUser.id !== prevProps.currentUser.id) {
      getFriends(currentUser.id);
    }
  }

  handleSearch() {
    const { searchUsers } = this.props;
		const searchInput = document.getElementById('searchInput').value;
    searchUsers(searchInput);
  }

  render() {
		const { searchResults, friends, currentUser } = this.props;
	
		// check search results to see if they're already on user's friendlist
		// also remove the current user from any search results
		searchResults.forEach((sr, i) => {
			if (sr.id === currentUser.id) searchResults.splice(i, 1)
			const eff = friends.find(f => f.personOne.id === sr.id || f.personTwo.id === sr.id)
			if (eff) {
				if (eff.personOne.id === currentUser.id) {
					eff.friendField = 'personTwo'
				}
				if (eff.personTwo && eff.personTwo.id === currentUser.id) {
					eff.friendField = 'personOne'
				}
				sr.friend = eff
				if (sr.friend.status === 1) {
					if (sr.friend.actionTaker === currentUser.id) {
						sr.actionType = 'waitingForAccept'
					} else {
						sr.actionType = 'incomingRequest'
					}
				}
				if (sr.friend.status === 2) {
					sr.actionType = 'friend'
				}
			}
		})

    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="search-page">
          <h2 className="friends-list-header">Search for friends</h2>
          <form id="searchform" className="search-form">
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
              {searchResults.map(sr => (
                <li key={sr.id}>
                  <FriendItem friend={sr} actionType={sr.actionType || null} actionTaker={currentUser.id} />
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
  getPerson: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
	currentUser: state.currentUser,
	friends: state.friends
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchUsers, getFriends, getPerson, updateSearch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch);
