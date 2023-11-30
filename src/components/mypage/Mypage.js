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
                <Profile/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
        </Col>
      </Row>
      
      <Statistics/>
    </Container>
  );
}

export default MyPage;