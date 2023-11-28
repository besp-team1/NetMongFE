import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentList.css'

const PostCommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/comment/${postId}`, {
                headers: {
                    Authorization: `Bearer ${`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1MXMzZTRycnIiLCJhdXRoIjoibWVtYmVyIiwiZXhwIjoxNzA5ODQ4NTMwfQ.h9Xq_74YAnxfqS3MFDZQTT8-CmUiQp12_gGLxZU8tO0TynB4hzGWY__SaasGt7pVmLyu6dFWb4aQXNprPSkrYQ`}`,
                },
            });
            setComments(response.data.data);
        } catch (error) {
            console.error('댓글 불러오는 중 오류 발생:', error.response.data);
        }
        };
        fetchComments();
    }, [postId]);

    return (
        <div className="comment-list-container">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p className="comment-username">{comment.username}</p>
                    <div className="comment-content">{comment.content}</div>
                </div>
            ))}
        </div>
    );
};

export default PostCommentList;