import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import myPostsAPI from '../../API/myPostsAPI';// API 함수를 import 합니다.

const Posts = () => {
  const [posts, setPosts] = useState([]); // 상태를 추가하여 포스트를 관리합니다.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API를 호출하여 포스트를 가져옵니다.
    const fetchPosts = async () => {
      try {
        const data = await myPostsAPI();
        setPosts(data);
      } catch (error) {
        console.error('포스트를 가져오는데 실패했습니다:', error);
      }
    };

    fetchPosts();
  }, []); // 빈 의존성 배열을 추가하여 컴포넌트가 마운트될 때만 API가 호출되도록 합니다.

  return (
    <Container>
      <h2>내 글 목록</h2>
      <Row>
        {posts.map((post) => ( // 가져온 포스트를 반복하여 표시합니다.
          <Col md={4} key={post.id}>
            <Card>
              <Card.Img variant="top" src={post.imageUrl} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;