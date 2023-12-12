import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import getPostsByUsernameAPI from '../../API/getPostsByUsernameAPI';
import { useInView } from 'react-intersection-observer';

const Posts = ({username}) => {
  const [posts, setPosts] = useState([]); // 상태를 추가하여 포스트를 관리합니다.
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [name] = useState(username);

  useEffect(() => {
    if (inView) {
      console.log(inView, '무한 스크롤 요청 🎃')
      fetchPosts(page);
    }
  }, [inView]);

  const fetchPosts = async (pageNumber) => {
    try {
      setLoading(false);
      const res = await getPostsByUsernameAPI(name, pageNumber);
      
      if (res.totalElements != totalCnt || res.totalPages >= page){
        setPosts([...posts, ...res.content]);
        setPage((page) => page + 1);
      }
      setTotalCnt(res.totalElements);
      setLoading(true);
    } catch (error) {
      console.error('포스트를 가져오는데 실패했습니다:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>내 글 목록</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post.postId} md={4} >
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
      <div ref={ref} style={{"marginTop":"200px"}}></div>
      {loading && <p>포스트를 불러오는 중...</p>}
    </Container>
  );
};

export default Posts;