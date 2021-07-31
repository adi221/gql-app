import React from 'react';

const AuthCard = ({ title, onSubmit, children }) => {
  return (
    <div className='auth-card'>
      <h2>{title}</h2>
      <form className='auth-card__form' onSubmit={onSubmit}>
        {children}
        <button className='auth-card__button'>{title}</button>
      </form>
    </div>
  );
};

export default AuthCard;
