import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Copyright from '../Components/Copyright'
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
  mainFeaturedPost: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(8),
    backgroundImage: 'url(https://i.imgur.com/VYBxMKp.gif)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 130,
    bottom: 200,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    marginBottom: theme.spacing(25),
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5.8),
    //   padding: theme.spacing(40),
      paddingRight: 0,
    },
  },
});

class Account extends Component{ 
  
    state = {
    showForm: false
  }
  
  handleShowForm = () => {
    this.setState({ showForm: !this.state.showForm })
    // console.log(this.state.showForm)
  }
  
render(){
    const {classes} = this.props
    // console.log(this.props.currentUser)
    // debugger 

return (
  <div>
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://media.giphy.com/media/AebNPktTHrdYc/giphy.gif)`
}}>
{/* Increase the priority of the hero background image */}
{<img style={{ display: 'none' }} src={`url(https://data.whicdn.com/images/159503389/original.gif)`} alt={classes.imageText} />}
{/**/}<div className={classes.overlay} />

<Grid container spacing={9} justify="center">
<Grid item md={3.5}>
<div className={classes.mainFeaturedPostContent} container spacing={3} justify="center">
<Typography className={classes.title} justify="center" color="secondary" variant="h3"  style={{fontFamily: ''}}><br/><br/>
<b>Ghibli Fan Cub Account </b>
</Typography>
<br/>
<Typography className={classes.subTitle} justify="center" color="secondary" variant="h5" color="inherint" style={{fontFamily: ''}} paragraph> <br/> 
<h2>{<PersonIcon />}<u></u> {this.props.currentUser.username}</h2>
<h2>{<EmailIcon />}<u></u> {this.props.currentUser.email}</h2><br/>
{this.props.currentUser ? <Button  variant="outlined" color="secondary" style={{fontFamily: ''}}><Link to="/edit"><b>Edit Account</b></Link></Button> : null}

</Typography>
</div>
</Grid>
</Grid>

</Paper>

<Copyright />
</div>
);
}}

export default withStyles(styles)(Account)