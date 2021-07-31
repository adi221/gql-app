import { useState } from 'react';

const useForm = (callback, initalState = {}) => {
  const [values, setValues] = useState(initalState);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    callback();

    setValues({ ...initalState });
  };

  return { values, onChange, onSubmit };
};

export default useForm;
