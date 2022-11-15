import React, {useState} from 'react';
import { Avatar, Typography, Grid, Paper, Button, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if (isSignedUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () =>{
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
        handleShowPassword(false);
    } ;

    const googleSuccess = async (res) => {
        const decoded = jwt_decode(res?.credential); 
        const token = res?.credential

        try {
            dispatch({ type: 'AUTH', data: { decoded, token } });
            history.push('/');
            
        } catch (error) {
            console.log(error)
        }


    };
    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was not successful')
    };

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'> {isSignedUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignedUp && (
                            <>
                              <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                              <Input name='lastName' label='Last Name' handleChange={handleChange}  half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignedUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                </Grid>

                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    { isSignedUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    className={classes.googleButton}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignedUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth