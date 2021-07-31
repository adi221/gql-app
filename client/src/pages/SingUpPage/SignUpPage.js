import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../../graphql/mutations/authMutations';
import AuthCard from '../../components/AuthCard/AuthCard';
import AuthControl from '../../components/AuthControl/AuthControl';
import useForm from '../../hooks/useForm';
import { useAuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const { setUser } = useAuthContext();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(registerUserCallBack, {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER, {
    variables: values,
    update(_, { data: { register: userData } }) {
      const { token, _id, username, user } = userData;
      setUser({ _id, username, user });
      localStorage.setItem('gqlToken', token);
      history.push('/');
    },
    onError(err) {
      console.log(err);
    },
  });

  function registerUserCallBack() {
    registerUser();
  }

  return (
    <div className='page'>
      <AuthCard title='Sign Up' onSubmit={onSubmit}>
        <AuthControl
          onChange={onChange}
          value={values.username}
          name='username'
          type='text'
          placeholder='Username'
        />
        <AuthControl
          onChange={onChange}
          value={values.name}
          name='name'
          type='text'
          placeholder='Name'
        />
        <AuthControl
          onChange={onChange}
          value={values.password}
          name='password'
          type='password'
          placeholder='Password'
        />
        <AuthControl
          onChange={onChange}
          value={values.confirmPassword}
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
        />
        <AuthControl
          onChange={onChange}
          value={values.email}
          name='email'
          type='text'
          placeholder='Email'
        />
      </AuthCard>
    </div>
  );
};

export default LoginPage;
