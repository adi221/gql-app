import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FaHeart } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';
import { LIKE_POST } from '../../graphql/mutations/postMutations';

const LikeButton = ({ likes, postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const isPostLiked = likes.some(like => like.user === user._id);
    if (isPostLiked) {
      setIsLiked(true);
    }
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST, { variables: { postId } });

  return (
    <>
      <button className='like-btn' onClick={likePost}>
        <FaHeart style={{ color: isLiked ? 'red' : 'inherit' }} />
      </button>
      <p>{likes.length} likes</p>
    </>
  );
};

export default LikeButton;
