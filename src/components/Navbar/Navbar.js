import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-logo.png';
import memoriesText from '../../images/memories-text.png';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [ user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const logout = () => {
        dispatch({ type: 'LOGOUT'})

        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
     }, [location]);

    return (
  <AppBar className={classes.appBar} position='static' color='inherit'>
    <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px' />
        <img className={classes.image} src={memoriesLogo} alt='icon' height='40px' />
    </Link>
    <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar src={user.decoded.picture} className={classes.purple} alt={user.decoded.name}>
                    {user.decoded.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'> {user.decoded.name}</Typography>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Log Out</Button>
            </div>
        ) : (
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
    </Toolbar>
  </AppBar>
  )
    };

export default Navbar