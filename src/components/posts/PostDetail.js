import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/posts/PostDetail.css';
import PostCommentForm from '../postComments/PostCommentForm';
import PostCommentList from '../postComments/PostCommentList';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const authToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPost(response.data.data);
        } catch (error) {
            console.error('게시글 불러오는 중 오류 발생:', error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setComments(response.data.data);
        } catch (error) {
            console.error('댓글 불러오는 중 오류 발생:', error.message);
        }
    };

    const handleUpdate = () => {
        navigate(`/post/update/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:9000/api/v1/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            navigate('/');
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error.message);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    return (
        <div className="post-container">
            <h1>{post.title}</h1>
            <img src={`${post.imageUrl}`} alt="게시물 이미지" style={{ maxWidth: '100%', height: 'auto' }} />
            <div className="post-sub">
                <p>{post.writer}</p>
                <p>{post.content}</p>
            </div>
            <div className="post-date">
                <p>{post.createDate}</p>
            </div>
            <div>
                <PostCommentList postId={id} comments={comments} />
                <PostCommentForm postId={id} onCommentSubmit={fetchComments} />
            </div>
            <div className="post-actions">
                {/* 수정 및 삭제 버튼 추가 */}
                <button className="btn-update" onClick={handleUpdate}>수정</button>
                <button className="btn-delete" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default PostDetail;
