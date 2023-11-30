import React from 'react';
import { Card } from 'react-bootstrap';

const Posts = ({ posts }) => {
  return (
    <div className="Posts">
      {posts.map((post, i) => (
        <Card key={i} className="Post">
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Posts;