import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from '../../graphql/queries/postQueries';
import SinglePost from '../../components/SinglePost/SinglePost';
import AddPostForm from '../../components/AddPostForm/AddPostForm';

const HomePage = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className='page home-page'>
      <AddPostForm />
      {data.posts.map(post => {
        return <SinglePost key={post._id} {...post} />;
      })}
    </div>
  );
};

export default HomePage;
