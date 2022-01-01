import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../state/action-creators/authActions';
import { getGames, getSearchGames, sortGames } from '../state/action-creators/gameActions';

import './AppNavbar.css';

class AppNavbar extends Component {
    state = {
        searchValue: '',
        tempGames: [],
        sorted: false
    }

    componentDidMount() {
        if(this.props.games.games.length < 5){
            this.props.getGames();
        }
    }

   componentDidUpdate() {
       if(this.state.searchValue.length === 0 && this.state.tempGames.length > 0){
            this.setState({tempGames: []})
       }
       if(!this.state.sorted && this.props.games.games.length > 1){
        this.setState({sorted: true});
        this.props.sortGames(this.props.games.games);
    }
   } 

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object,
        logout: PropTypes.func.isRequired,
        getGames: PropTypes.func.isRequired,
        games: PropTypes.object.isRequired,
        getSearchGames: PropTypes.func.isRequired,
        sortGames: PropTypes.func.isRequired
    }

    handleChange = (event) => {
        this.setState({searchValue: event.target.value});
        const newGames = this.props.games.sortedGames.filter((game) => {if(game.name !== null){
            return (game.name.toString().toLowerCase().includes(event.target.value.toLowerCase()))
        }});
        if(this.state.searchValue.length > 0){
            this.setState({tempGames: newGames})
        } else {
            this.setState({tempGames: []})
        }
        this.props.getSearchGames(newGames)
    }

    handleClick = (game) => {
        this.setState({tempGames: [game]})
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div className='nav'>
                <div className='title'><Link to='/' className='title-button' style={{ textDecoration: 'none' }}>MyGamingList</Link></div>
                <div className='search'>
                    <input className='search-box' type='search' placeholder='Search games' value={this.searchValue} onChange={(e) => {this.handleChange(e)}} />
                    <div className='games-dropdown'>
                        {this.state.tempGames.slice(0, 5).map((game, idx) => {if(game !== undefined){return (<div className='temp-game' key={idx} onClick={(game) => this.handleClick(game)}></div>)}})}
                    </div>
                </div>
                {!this.props.isAuthenticated ?
                <div className='reglog'>
                <div className='register2'>
                    <Link to='/register' style={{ textDecoration: 'none' }} className='register'>Register</Link>
                </div>
                <div className='login2'>
                    <Link to='/login' style={{ textDecoration: 'none' }} className='login'>Login</Link>
                </div></div> : 
                <div className = 'proout'>
                    <div className='profile'><Link to='/Profile' style={{ textDecoration: 'none' }} className='profile2'>{this.props.user.name}</Link></div>
                    <div className='logout'>
                        <button onClick={() => this.logout()}>Logout</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    games: state.games
})

export default connect(
    mapStateToProps,
    { logout, getGames, getSearchGames, sortGames }
)(AppNavbar);