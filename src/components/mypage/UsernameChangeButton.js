import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import usernameChangeAPI from '../../API/usernameChangeAPI'; // API 경로도 수정
import '../../style/mypage/UsernameChangeButton.css'; // 클래스명이나 파일 경로는 상황에 따라 적절히 수정하세요.

const UsernameChangeButton = () => {
    const [show, setShow] = useState(false);
    const [newUsername, setNewUsername] = useState(''); 
    const [newUsernameError, setNewUsernameError] = useState(''); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleUsernameChange = async () => {
        if (newUsername === '') {
            setNewUsernameError('새 사용자 이름을 입력해주세요'); 
            return;
        }
        
        const response = await usernameChangeAPI(newUsername)
        .then(()=>{
          localStorage.setItem('username', newUsername);
          alert('사용자 이름 변경 성공');
          handleClose();
          window.location.reload();
        })
        .catch((error)=> alert(error.response.data.message)); 
        return response;
        
    };

    return (
      <>
        <Button className="profileUsernameBtn" onClick={handleShow}>사용자 이름 변경</Button>
        <Modal className="usernameModal" show={show} onHide={handleClose}>
          <Modal.Header className="usernameModalBtn" closeButton>
            <Modal.Title>사용자 이름 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNewUsername">
                <Form.Label>새 사용자 이름</Form.Label>
                <Form.Control type="text" placeholder="새 사용자 이름" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                {newUsernameError && <div style={{color: 'red', fontSize: '12px', marginTop: '-10px'}}>{newUsernameError}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="usernameCloseModalBtn" variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button className="usernameChangeModalBtn" variant="primary" onClick={handleUsernameChange}>
              변경하기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default UsernameChangeButton;
