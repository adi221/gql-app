import { useContext, createContext, useState, useEffect } from 'react';
import { LOGIN } from '../graphql/mutations/authMutations';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loginUser] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      const { _id, username, user } = userData;
      setUser({ _id, username, user });
      history.push('/');
    },
    onError(err) {
      localStorage.removeItem('gqlToken');
      console.log(err);
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (user) return;
    if (localStorage.getItem('gqlToken')) {
      loginUser('', '');
    }
  }, [user]);

  const signOut = () => {
    localStorage.removeItem('gqlToken');
    setUser(null);
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
