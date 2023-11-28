import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

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
          // 여기에 사용자의 다른 정보나 기능을 추가할 수 있습니다.
        </Col>
      </Row>
    </Container>
  );
}

export default MyPage;