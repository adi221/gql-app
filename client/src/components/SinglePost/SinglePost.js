import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';
import InputControl from '../AuthControl/AuthControl';
import useForm from '../../hooks/useForm';
import { COMMENT_POST } from '../../graphql/mutations/postMutations';

const SinglePost = ({ _id, body, username, comments, likes }) => {
  const commentRef = useRef(null);
  const { onChange, onSubmit, values } = useForm(commentPostCallback, {
    comment: '',
  });

  const [commentPost] = useMutation(COMMENT_POST, {
    variables: { postId: _id, commentBody: values.comment },
  });

  function commentPostCallback() {
    commentPost();
  }

  return (
    <div className='single-post'>
      <h2>{username}</h2>
      <p>{body}</p>
      <div className='single-post__btns'>
        <LikeButton likes={likes} postId={_id} />
        <CommentButton comments={comments} commentRef={commentRef} />
      </div>
      <form onSubmit={onSubmit}>
        <InputControl
          onChange={onChange}
          value={values.comment}
          name='comment'
          type='text'
          placeholder='Add Comment'
          inputRef={commentRef}
        />
      </form>
    </div>
  );
};

export default SinglePost;
