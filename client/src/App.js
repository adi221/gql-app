import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SingUpPage/SignUpPage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';
import Header from './components/Header/Header';
import AuthRoute from './components/AuthRoute/AuthRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <AuthRoute path='/post/:id' component={SinglePostPage} />
        <AuthRoute exact path='/' component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
