import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

export default AuthRoute;
