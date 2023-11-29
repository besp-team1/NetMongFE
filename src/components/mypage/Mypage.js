import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Profile from "./Profile";
import Statistics from "./Statstics";

const MyPage = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>사용자 이름</Card.Title>
              <Card.Text>
                이곳에 사용자의 정보를 표시합니다.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
        </Col>
      </Row>
      <Profile/>
      <Statistics/>
    </Container>
  );
}

export default MyPage;