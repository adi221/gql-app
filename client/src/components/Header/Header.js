import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuthContext();

  return (
    <nav className='nav'>
      <div className='nav__center'>
        <div className='nav__center--logo'>GQL</div>
        <ul className='nav__center--links'>
          {user ? (
            <>
              <li>
                <NavLink
                  exact
                  to='/'
                  activeClassName='nav__center--links-selected'
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to='/chat'
                  activeClassName='nav__center--links-selected'
                >
                  Chat
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  exact
                  to='/login'
                  activeClassName='nav__center--links-selected'
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to='/signUp'
                  activeClassName='nav__center--links-selected'
                >
                  Sign up
                </NavLink>
              </li>{' '}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
