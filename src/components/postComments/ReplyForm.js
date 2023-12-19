import React, { useState } from 'react';
import axios from 'axios';
import '../../style/parks/ParkCommentForm.css';

const ReplyForm = ({ commentId }) => {
  const [reply, setReply] = useState('');

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:9000/api/v1/post/comment/${commentId}/reply`;
    const data = {
      content: reply,
    };

    try {
      await axios.post(url, data);
      console.log('대댓글이 성공적으로 작성되었습니다.');
      setReply('');
    } catch (error) {
      console.error('대댓글 작성 중 오류 발생:', error.message);
    }
  };

  return (
    <div className="parkComment-container">
      <form onSubmit={handleReplySubmit} className="parkComment-form">
        <div className="parkComment-input-container">
          <textarea 
            id="comment" 
            className="ParkCommentTextarea" 
            placeholder="대댓글을 작성하세요." 
            value={reply} 
            onChange={handleReplyChange} 
          />
        </div>
        <button type="submit" className="parkSubmit-button">전송</button>
      </form>
    </div>
  );
};

export default ReplyForm;