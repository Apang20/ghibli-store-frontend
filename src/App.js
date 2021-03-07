// import React from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './App.css';
import React, { Fragment } from 'react';
import { Route, Switch, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'

// import React, { Component } from "react";
// import { Button, TextField } from '@material-ui/core';
// import EmailIcon from '@material-ui/core/icons/Email';
// import PhoneIcon from '@material-ui/core/icons/Phone';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MovieContainer from './Components/MovieContainer';
// import Search from './Components/Search'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'

import Account from './Components/Account'
import LoginForm from './Components/LoginForm';
import NavBar from './Components/NavBar';
import Cart from './Components/Cart';
import ItemContainer from './Components/ItemContainer';
// import FilterBar from './Components/FilterBar';
import Register from './Components/Register'
import NotFound from './Components/NotFound'
import Footer from './Components/Footer'
import Home from './Components/Home'
import EditForm from './Components/EditForm'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'

import { ChakraProvider } from "@chakra-ui/react"


const ItemsURL = "http://localhost:3000/items/"
const CartsURL = "http://localhost:3000/carts/"
const CartItemsURL = "http://localhost:3000/cart_items/"
const UsersURL = "http://localhost:3000/users/"

const theme = createMuiTheme({
    typography: {
        h2: {
            fontSize: 40,
            marginBottom: 15,
            marginTop: 80,
            textAlign: 'center'
        },
        subtitle1: {
            fontSize: 30,
            marginBottom: 15,
            textAlign: 'center'
        }
    },
    palette: {
        primary: {
            main: blue[300],
        },
        secondary: {
            main: green[400]
        }
    }
})


class App extends React.Component {

    state = {
        currentUser: null, //user:{}
        loggedIn: false,
        items: [],
        carts: [],
        cart_items: [],
        filter: "All",
        movieFilter: "",
        movies: ["My Neighbor Totoro", "Ponyo", "Ghibli", "Howl's Moving Castle", "Princess Mononoke", "Spirited Away", "Kiki's Delivery Service"],
        search: "",
        limit: 0
    }


    updateCurrentUser = (user) => {
        this.setState({
            currentUser: user,
            loggedIn: true,
        });
    };

    logOut = () => {
        this.setState({ currentUser: null, loggedIn: false })
        localStorage.token = "";

    }

    logInUser = (username) => {
        let current = this.state.users.find(
            (user) => user.username === username
        );
        this.setState({ currentUser: current });
    };



    autoLogin = () => {
        let token = localStorage.token;
        if (typeof token !== "undefined" && token.length > 1) {
            this.tokenLogin(token);
        } else {
            console.log("No token found, try logging in!");
        }
    };

    tokenLogin = (token) => {
        fetch("http://localhost:3000/auto_login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        })
            .then((r) => r.json())
            .then((user) => this.updateCurrentUser(user));
    };


    componentDidMount() {
        Promise.all([fetch(ItemsURL), fetch(CartsURL), fetch(UsersURL), fetch(CartItemsURL)])
            .then(([res1, res2, res3, res4]) => {
                return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
            })
            .then(([items, carts, users, cart_items]) => {
                this.setState({ items });
                this.setState({ carts });
                this.setState({ users });
                this.setState({ cart_items });
                // console.log(carts, "Carts")
                // console.log(cart_items, "Cart_Items")
            });
        this.autoLogin()
    }


    addToCart = (item) => { //item is the obj
        let addCart
        addCart = {
            item_id: item.id,
            cart_id: 9 //grab from backend to make dynamic?/ Cart.first after seeding
        };
        let reqPack = {};
        reqPack.method = "POST";
        reqPack.headers = { "Content-Type": "application/json" };
        reqPack.body = JSON.stringify(addCart);

        fetch("http://localhost:3000/cart_items", reqPack)
            .then(res => res.json())
            .then(res => {
                res.item = item
                let updateCart = [...this.state.carts, res]
                this.setState({ carts: updateCart });
                // console.log(res)
            })
    }


    removeFromCart = (cart_items) => {
        console.log(cart_items, "removeFromCart function")

        fetch(CartItemsURL + cart_items.id, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    carts: this.state.carts.filter((filteredCart) => filteredCart != cart_items)
                })
            })
    }

    patchInfo = (newInfo) => {
        this.setState({
            currentUser: {
                username: newInfo.username,
                first_name: newInfo.firstName,
                last_name: newInfo.lastName,
                email: newInfo.email,
                shipping_address: newInfo.shippingAddress,
                phone_number: newInfo.phoneNumber
            }
        })
        // console.log(newInfo, "NewInfo")
        // console.log(this.state.currentUser, "Current User")

    }

    moreItems = () => {
        this.setState({
            limit: this.state.limit + 8
        })
    }

    backItems = () => {
        this.setState({
            limit: this.state.limit - 8
        })
    }

    updateFilter = (filter) => {
        this.setState({ filter })
    }


    updateMovieFilter = (movieFilter) => {
        this.setState({ movieFilter })
    }

    filteredItems = () => {
        let filtereditems = this.state.items
        if (this.state.filter !== "All") {
            filtereditems = filtereditems.filter(item => item.movie === this.state.filter)
        }
        return filtereditems
    }


    render() {
        const filteredItems = this.state.items.filter(item => item.movie.toLowerCase().includes(this.state.filter.toLowerCase()))
        const filteredMovies = this.state.movies.filter(movie => movie.includes(this.state.movieFilter))

        return (
            <Fragment>
            <ChakraProvider>
            <ThemeProvider theme={theme}>
                    <Container maxWidth="xd">
                        <header className="App-header">
                            <Typography variant="h2" component="div"> 
                               
                </Typography>
                            <Typography variant="subtitle1">
                              
                </Typography>
                        </header>
                        <NavBar
                            currentUser={this.state.currentUser}
                            logOut={this.logOut} />
                        <Router />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" render={() => (
                                this.state.currentUser == null ?
                                    <LoginForm
                                        updateCurrentUser={this.updateCurrentUser} /> : <Redirect to="/items" />
                            )} />

                            <Route exact path="/auth">
                                Auth Check{" "}
                                {!this.state.loggedIn
                                    ? "(Works better if you're logged in!)"
                                    : "(Try it now you're logged in!)"}
                                <NavBar loggedIn={this.state.loggedIn} />
                            </Route>

                            <Route exact path="/register" component={Register} />
                            <Route path="/carts" render={() => (
                                <Cart
                                    currentUser={this.state.currentUser}
                                    carts={this.state.carts}
                                    removeFromCart={this.removeFromCart} />)} />

                            <Route exact path="/edit" render={() =>
                                <EditForm
                                    currentUser={this.state.currentUser}
                                    patchInfo={this.patchInfo} />} />

                            <Route exact path="/users" render={() =>
                                <Account
                                    currentUser={this.state.currentUser} />} />
                            <Route exact path="/items" render={(props) => (
                                <ItemContainer
                                    addToCart={this.addToCart}
                                    updateCurrentUser={this.updateCurrentUser}
                                    user={this.state.currentUser}
                                    filter={this.state.filter}
                                    updateFilter={this.updateFilter}
                                    movies={this.state.movies}
                                    movieFilter={this.state.movieFilter}
                                    updateMovieFilter={this.updateMovieFilter}
                                    moreItems={this.moreItems}
                                    limit={this.state.limit}
                                    items={this.filteredItems().slice(this.state.limit, this.state.limit + 8)}
                                    limit={this.state.limit}
                                    itemLength={this.state.items.length}
                                    backItems={this.backItems} />)} />
                            <Route exact path="/notfound" component={NotFound} />
                        </Switch>
                        <Router />
                       <Footer/>         
                    </Container>
                </ThemeProvider>
                </ChakraProvider>
                
            </Fragment>

        )
    }

}

export default App;



//<FilterBar />








// return (
//     <Fragment>
//         <ThemeProvider theme={theme}>
//             <Container maxWidth="xd">
//                 <header className="App-header">
//                     <Typography variant="h2" component="div"> 
//                         Welcome Header Message!
//         </Typography>
//                     <Typography variant="subtitle1">
//                         Exclusive Site for Ghibli-Fans
//         </Typography>
//                 </header>
//                 <NavBar
//                     currentUser={this.state.currentUser}
//                     logOut={this.logOut} />
//                 <Router />
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route exact path="/login" render={() => (
//                         this.state.currentUser == null ?
//                             <LoginForm
//                                 updateCurrentUser={this.updateCurrentUser} /> : <Redirect to="/items" />
//                     )} />

//                     <Route exact path="/auth">
//                         Auth Check{" "}
//                         {!this.state.loggedIn
//                             ? "(Works better if you're logged in!)"
//                             : "(Try it now you're logged in!)"}
//                         <NavBar loggedIn={this.state.loggedIn} />
//                     </Route>

//                     <Route exact path="/register" component={Register} />
//                     <Route path="/carts" render={() => (
//                         <Cart
//                             currentUser={this.state.currentUser}
//                             carts={this.state.carts}
//                             removeFromCart={this.removeFromCart} />)} />

//                     <Route exact path="/edit" render={() =>
//                         <EditForm
//                             currentUser={this.state.currentUser}
//                             patchInfo={this.patchInfo} />} />

//                     <Route exact path="/users" render={() =>
//                         <Account
//                             currentUser={this.state.currentUser} />} />
//                     <Route exact path="/items" render={(props) => (
//                         <ItemContainer
//                             addToCart={this.addToCart}
//                             updateCurrentUser={this.updateCurrentUser}
//                             user={this.state.currentUser}
//                             filter={this.state.filter}
//                             updateFilter={this.updateFilter}
//                             movies={this.state.movies}
//                             movieFilter={this.state.movieFilter}
//                             updateMovieFilter={this.updateMovieFilter}
//                             moreItems={this.moreItems}
//                             limit={this.state.limit}
//                             items={this.filteredItems().slice(this.state.limit, this.state.limit + 4)}
//                             limit={this.state.limit}
//                             itemLength={this.state.items.length}
//                             backItems={this.backItems} />)} />
//                     <Route exact path="/notfound" component={NotFound} />
//                 </Switch>
//                 <Router />

//                 <FilterBar />
//                 <Footer />
//             </Container>
//         </ThemeProvider>
//     </Fragment>

// )
// }

// }

// export default App;


