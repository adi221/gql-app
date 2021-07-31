import React from 'react';

const AuthControl = ({
  onChange,
  value,
  name,
  type,
  placeholder,
  inputRef = null,
}) => {
  return (
    <input
      className='auth-card__form--control'
      onChange={onChange}
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};

export default AuthControl;
