import React, { Component } from 'react'
import { addGameToUser, addGameToUser2, deleteGameFromUser, deleteGameFromUser2, addRatingToUser, addRatingToUser2 } from '../../state/action-creators/authActions';
import { addRatingToGame, addRatingToGame2 } from '../../state/action-creators/gameActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Profile.css'

const ratingsList = ['N/A',1,2,3,4,5,6,7,8,9,10];

class Profile extends Component {
    state = {
        usersGames : []
    }


    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        addGameToUser: PropTypes.func.isRequired,
        addGameToUser2: PropTypes.func.isRequired,
        deleteGameFromUser: PropTypes.func.isRequired,
        deleteGameFromUser2: PropTypes.func.isRequired,
        user: PropTypes.object,
        games: PropTypes.object.isRequired,
        addRatingToUser: PropTypes.func.isRequired,
        addRatingToUser2: PropTypes.func.isRequired,
        addRatingToGame: PropTypes.func.isRequired,
        addRatingToGame2: PropTypes.func.isRequired
    }

    componentDidMount() {
        if(this.props.isAuthenticated){
            let gamesArr = [];
            for(let i = 0; i < this.props.games.games.length; i++){
                if(this.props.games.games[i]._id in this.props.user.user.list){
                    gamesArr.push(this.props.games.games[i]);
                }
            }
            this.setState({usersGames: gamesArr});
        }
    }

    addGame = (game) => {
        this.props.addGameToUser(game, this.props.user.user);
        this.props.addGameToUser2(game, this.props.user.user);
     }
 
    deleteGame = (game) => {
         this.props.deleteGameFromUser(game, this.props.user.user);
         this.props.deleteGameFromUser2(game, this.props.user.user);
     }

    handleRate = (num, game) => {
        if(num === 'N/A') num = -1;
        if(this.props.isAuthenticated){
            this.props.addRatingToUser(num, game, this.props.user.user);
            this.props.addRatingToUser2(num, game, this.props.user.user);
            this.props.addRatingToGame(num, this.props.games.games, game, this.props.user.user);
            this.props.addRatingToGame2(num, game, this.props.user.user);
        }
    }

    redirect = () => {
        this.setState({redirect: true});
    }

    getRating = (game) => {
        if(game.ratings){
            let sum = 0;
            let counter = 0;
            Object.keys(game.ratings).map((key) => {
                if(game.ratings[key] !== -1){
                    sum += game.ratings[key];
                    counter++;
                }
            })

            return sum / counter;
        }else {
            return -1
        }
    }

    render() {
        return (
            <div>
            {this.state.usersGames ? 
            <div className='home-container'>
            <div className='all-games'>
                <div className='headers'>
                    <div className='rank-header'>Rank</div>
                    <div className='title-header'>Title</div>
                    <div className='rating-header'>Rating</div>
                    <div className='your-rating-header'>Your Rating</div>
                    <div className='status-header'>Status</div>
                </div>
                {this.state.usersGames.slice(0, this.state.numberOfGames).map((game, idx) => (
                        <div className='game' key={idx}>
                            <div className='rank-game'>{idx + 1}</div>
                            <div className='title-game'>
                                <img className='image' src={game.header_image} alt='game' />
                                <div className='title-block'>
                                    <div className='game-name'>{game.name}</div>
                                    <div className='genres'>Genres: {game.genres}</div>
                                    <div className='developer'>Developer: {game.developer}</div>
                                    <div className='platforms'>Platforms: {game.platforms.split(';').join(', ')}</div>
                                </div>
                            </div>
                            {game ? game.ratings ? this.getRating(game) > -1 ?
                                <div className='rating-game' >{this.getRating(game)}</div> :
                                <div className='rating-game'>N/A</div> :
                                <div className='rating-game'>N/A</div> :
                                <div className='rating-game'>N/A</div>
                            }
                            {this.props.user.user ? this.props.user.user.list ? this.props.user.user.list[game._id] > -1 ?
                                <div className='your-rating-game' >
                                    <div className='ratingsList' onMouseEnter={() => {this.setState({isHover: true, isGame: game});}} onMouseLeave={() => {this.setState({isHover: false, isGame: []});}}>
                                    <div>{this.props.user.user.list[game._id]}</div>
                                    {this.state.isHover && this.state.isGame === game && ratingsList.map((num, idx) => {
                                        return <div className='listItem' onClick={() => this.handleRate(num, game)} key={idx}>{num}</div>
                                    })}
                                    </div>
                                </div> :
                                <div className='your-rating-game' >
                                    <div className='ratingsList' onMouseEnter={() => {this.setState({isHover: true, isGame: game});}} onMouseLeave={() => {this.setState({isHover: false, isGame: []});}}>
                                    <div>N/A</div>
                                    {this.state.isHover && this.state.isGame === game && ratingsList.map((num, idx) => {return <div className='listItem' onClick={() => this.handleRate(num, game)} key={idx}>{num}</div>})}
                                    </div>
                                </div> :
                                <div className='your-rating-game' >
                                    <div className='your-rating-game-button' onMouseEnter={() => {this.setState({isHover: true, isGame: game});}} onMouseLeave={() => {this.setState({isHover: false, isGame: []});}}>N/A</div>
                                    {this.state.isHover && this.state.isGame === game && ratingsList.map((num, idx) => {return <div className='listItem' onClick={() => this.redirect()} key={idx}>{num}</div>})}
                                </div> :
                                <div className='your-rating-game' >
                                    <div className='ratingsList' onMouseEnter={() => {this.setState({isHover: true, isGame: game});}} onMouseLeave={() => {this.setState({isHover: false, isGame: []});}}>
                                    <div>N/A</div>
                                    {this.state.isHover && this.state.isGame === game && ratingsList.map((num, idx) => {return <div className='listItem' onClick={() => this.redirect()} key={idx}>{num}</div>})}
                                    </div>
                                </div>
                            }<div className='status-game1'>
                            {this.props.user.user ? this.props.user.user.list ? typeof this.props.user.user.list[game._id] === 'number' ?
                                <button className='status-game' onClick={e => this.deleteGame(game)}>remove game</button> :
                                <button className='status-game' onClick={e => this.addGame(game)}>add game</button> :
                                <div className='status-game' >no list</div> :
                                <button className='status-game' onClick={() => this.redirect()}>add game</button>
                            }</div>
                        </div>
                ))}
            </div>
        </div>
        : <div>no games</div>}</div>)
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth,
    games: state.games
})

export default connect(
    mapStateToProps,
    { addGameToUser, deleteGameFromUser, addGameToUser2, deleteGameFromUser2, addRatingToGame2, addRatingToUser, addRatingToUser2, addRatingToGame }
)(Profile);