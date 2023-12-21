import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import passwordChangeAPI from '../../API/passwordChangeAPI';
import '../../style/mypage/PasswordChangeButton.css';

const PasswordChangeButton = () => {
    const [show, setShow] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handlePasswordChange = async () => {
        if (oldPassword === '') {
          setOldPasswordError('기존 비밀번호를 입력해주세요');
        }
        if (newPassword === '') {
          setNewPasswordError('새 비밀번호를 입력해주세요');
        }
        if (oldPassword === '' || newPassword === '') {
          return;
        }
        try {
          const response = await passwordChangeAPI(oldPassword, newPassword);
          console.log(response.data);
          alert('비밀번호 변경 성공');
          handleClose();
        } catch (error) {
          console.error(error);
          alert('비밀번호 변경 실패');
        }
      };
    return (
      <>
        <Button className="profilePasswordBtn" onClick={handleShow}>비밀번호 변경</Button>
        <Modal className="passwordModal" show={show} onHide={handleClose}>
          <Modal.Header className="passwordCloseBtn" closeButton>
            <Modal.Title className="passwordTitle">비밀번호 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formOldPassword">
                <Form.Label>기존 비밀번호</Form.Label>
                <Form.Control className="passwordForm" type="password" placeholder="기존 비밀번호" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                {oldPasswordError && <div style={{color: 'red', fontSize: '12px', marginTop: '-10px', marginBottom: '10px'}}>{oldPasswordError}</div>}
              </Form.Group>
  
              <Form.Group controlId="formNewPassword">
                <Form.Label>새 비밀번호</Form.Label>
                <Form.Control className="passwordForm" type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                {newPasswordError && <div style={{color: 'red', fontSize: '12px', marginTop: '-10px'}}>{newPasswordError}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="passwordCloseModalBtn" variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button className="passwordChangeModalBtn"  variant="primary" onClick={handlePasswordChange}>
              변경하기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default PasswordChangeButton;
  