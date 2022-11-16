import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar'; 
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return  (
    <BrowserRouter>
      <Container maxWidth='xl'>
      <GoogleOAuthProvider clientId = '473004543329-qkk9u4p3mtrpjght3dc7qq1f71jr542b.apps.googleusercontent.com' >
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
        </Switch>
        </GoogleOAuthProvider>
      </Container>
    </BrowserRouter>

  )
}

export default App