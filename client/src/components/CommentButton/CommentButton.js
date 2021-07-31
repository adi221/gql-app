import React from 'react';
import { FaRegComment } from 'react-icons/fa';

const CommentButton = ({ commentRef, comments }) => {
  return (
    <>
      <FaRegComment onClick={() => commentRef.current.focus()} />
      <p>{comments.length} comments</p>
    </>
  );
};

export default CommentButton;
