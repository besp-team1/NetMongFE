import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import getPostsByUsernameAPI from '../../API/getPostsByUsernameAPI';
import { useInView } from 'react-intersection-observer';
import '../../style/mypage/Posts.css';

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
    <Container className="Posts-container">
      <div className="line-Title">
        <h2 className="Posts-h2">글 목록</h2>
      </div>
      <div className="Posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.postId} className="Post">
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img variant="top" src={`${process.env.REACT_APP_IMAGE_URL}/${post.imageUrl}`} style={{ position: 'absolute', width: '100%' }} />
                <div className="CardBody" style={{ position: 'absolute', bottom: '10px'}}>
                  <Link to={`/post/${post.postId}`} className="card-title">
                    {post.title}
                  </Link>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="emptyPosts">작성한 포스트가 없습니다.</p>
        )}
      </div>

{/* 
      <Row>
        {posts.map((post) => (
          <Col key={post.postId} md={4} >
            <Card>
              <Card.Img variant="top" src={`${process.env.REACT_APP_IMAGE_URL}/${post.imageUrl}`} />
              <Card.Body>
              <Card.Title>
                <Link to={`/post/${post.postId}`} className="postItem-title">
                  {post.title}
                </Link>
              </Card.Title>
                <Card.Text>
                  {post.content}
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        ))}
      </Row> */}



      <div ref={ref} style={{"marginTop":"200px"}}></div>
      {loading && <p className="loading-message">포스트를 불러오는 중...</p>}
    </Container>
  );
};

export default Posts;