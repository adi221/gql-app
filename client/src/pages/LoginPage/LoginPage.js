import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../graphql/mutations/authMutations';
import AuthCard from '../../components/AuthCard/AuthCard';
import AuthControl from '../../components/AuthControl/AuthControl';
import useForm from '../../hooks/useForm';
import { useAuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const { setUser } = useAuthContext();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: '',
    password: '',
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN, {
    variables: values,
    update(_, { data: { login: userData } }) {
      const { token, _id, username, user } = userData;
      setUser({ _id, username, user });
      localStorage.setItem('gqlToken', token);
      history.push('/');
    },
    onError(err) {
      console.log(err);
    },
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className='page'>
      <AuthCard title='Login' onSubmit={onSubmit}>
        <AuthControl
          onChange={onChange}
          value={values.username}
          name='username'
          type='text'
          placeholder='Username'
        />
        <AuthControl
          onChange={onChange}
          value={values.password}
          name='password'
          type='password'
          placeholder='Password'
        />
      </AuthCard>
    </div>
  );
};

export default LoginPage;
