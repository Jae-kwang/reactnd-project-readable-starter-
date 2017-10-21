import React from 'react';
import { Card } from 'semantic-ui-react'
import shortid from 'shortid';

const Post = (props) => {
  const { post, onClick } = props;
  return (
    <Card
      link
      id={post.id}
      header={post.title}
      meta={post.category}
      description={post.body}
      onClick={onClick}
    />
  )
};

const PostList = (props) => {
  const { list, onClickHandler } = props;
  return (
    <Card.Group itemsPerRow={3}>
      {
        list.map((post) => {
          return <Post key={shortid.generate()} post={post} onClick={onClickHandler}></Post>
        })
      }
    </Card.Group>
  )
};

export default PostList;
