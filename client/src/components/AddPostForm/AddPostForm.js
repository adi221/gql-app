import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from '../../hooks/useForm';
import InputControl from '../AuthControl/AuthControl';
import { CREATE_POST } from '../../graphql/mutations/postMutations';

const AddPostForm = () => {
  const { onSubmit, onChange, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div>
      <h2>Create a post</h2>
      <form onSubmit={onSubmit}>
        <InputControl
          value={values.body}
          onChange={onChange}
          name='body'
          type='text'
          placeholder='Create new post'
        />
        <button>Add Post</button>
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default AddPostForm;
