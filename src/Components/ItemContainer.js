import React, { Component } from 'react'
import ItemCard from './ItemCard'
import Search from './Search'
import MovieContainer from './MovieContainer'
import MoreButton from './MoreButton'
import BackButton from './BackButton'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'


class ItemContainer extends Component {

      
    render() {
        return (
            <div className="search">
                <Search 
                updateFilter={this.props.updateFilter} 
                movies={this.props.movies} 
                movieFilter={this.props.movieFilter} 
                updateMovieFilter={this.props.updateMovieFilter}/>
                
                                                    

                <div className="movie-container">
                    <MovieContainer 
                    movies={this.props.movies} 
                    movieFilter={this.props.movieFilter} 
                    updateMovieFilter={this.props.updateMovieFilter} />


                    <div className="item-container" >
                 
                
                        <div className="background-img">
                        <div className="more-back-btns">
                        {this.props.limit + 1 < this.props.itemLength ? <MoreButton moreItems={this.props.moreItems} items={this.props.items}/> : null}  <br/>
                        {this.props.limit == 0 ? null : <BackButton  backItems={this.props.backItems} items={this.props.items}/>}  <br/>
                        </div>
                        {this.props.items.map(item => <ItemCard item={item} addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart} updateCurrentUser={this.props.updateCurrentUser} user={this.props.currentUser} />)} 
                        </div>
                        </div>
                        </div>
            </div>


        )
    }
};

export default ItemContainer;





