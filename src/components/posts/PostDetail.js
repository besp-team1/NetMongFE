import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../style/posts/PostDetail.css';
import PostCommentForm from '../postComments/PostCommentForm';
import PostCommentList from '../postComments/PostCommentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ReportModal from '../reportPost/ReportModal';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

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
            setLiked(response.data.data.isLiked);
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

    const fetchLikesCount = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/likes/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setLikesCount(response.data.data.likedCount);
        } catch (error) {
            console.error('좋아요 수 불러오는 중 오류 발생:', error.message);
        }
    };
    
    const handleUpdate = async () => {
        const loggedInUsername = localStorage.getItem('username');

        if (loggedInUsername && loggedInUsername === post.writer) { 
            navigate(`/post/update/${id}`);
        } else {
            alert('작성자만이 게시글을 수정할 수 있습니다.'); 
        }
    };

    const handleDelete = async () => {
        const loggedInUsername = localStorage.getItem('username');
        
        if (loggedInUsername && loggedInUsername === post.writer) { 
            try {
                await axios.delete(`http://localhost:9000/api/v1/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                navigate(`/`);
            } catch (error) {
                console.error('게시글 삭제 중 오류 발생:', error.message);
            }
        } else {
            alert('작성자만이 게시글을 삭제할 수 있습니다.'); 
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
        fetchLikesCount();
    }, [id]);

    const handleLike = async () => {
        if (liked) {
            try {
                const response = await axios.delete(`http://localhost:9000/api/v1/post/likes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setLiked(false);
                fetchLikesCount();
            } catch (error) {
                console.error('좋아요 삭제 중 오류 발생:', error.message);
            }
        } else {
            try {
                const response = await axios.post(`http://localhost:9000/api/v1/post/likes/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setLiked(true);
                fetchLikesCount();
            } catch (error) {
                console.error('좋아요 추가 중 오류 발생:', error.message);
            }
        }
    };
    
    const handleUnlike = async () => {
        try {
            const response = await axios.delete(`http://localhost:9000/api/v1/post/likes/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            fetchLikesCount();
        } catch (error) {
            console.error('좋아요 삭제 중 오류 발생:', error.message);
        }
    };
    

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    const content = post.content;
    const regex = /#[^\s#]+/g;
    const hashtags = content.match(regex);
    const splitContent = content.split(regex);

    return (
        <div className="post-container">
            <h1>{post.title}</h1>
            <img src={`${post.imageUrl}`} alt="게시물 이미지" style={{ maxWidth: '100%', height: 'auto' }} />
            <div className="post-sub">
                <p>{post.writer}</p>
                <p>
                    {splitContent.map((part, index) => {
                        return (
                            <React.Fragment key={index}>
                                {part}
                                {hashtags[index] && (
                                    <a
                                        href={`/post/hashtagSearch?hashtag=${hashtags[index].substring(1)}`}
                                        className="hashtag-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/post/hashtagSearch?hashtag=${hashtags[index].substring(1)}`);
                                        }}
                                    >
                                        {hashtags[index]}
                                    </a>
                                )}
                            </React.Fragment>
                        );
                    })}
                </p>
            </div>
            <div className="post-date">
                <p>{post.createDate}</p>
            </div>

            <div className="btn-report">
                <ReportModal postId={id} />
            </div>

            <div className="like-container">
                <button className="btn-like" onClick={handleLike}>
                    {liked ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} />}
                </button>
                <p>{likesCount}</p>
            </div>
            
            <div className="post-actions">
                <button className="btn-update" onClick={handleUpdate}>수정</button>
                <button className="btn-delete" onClick={handleDelete}>삭제</button>
            </div>
            <div>
                <PostCommentList postId={id} comments={comments} />
                <PostCommentForm postId={id} onCommentSubmit={fetchComments} />
            </div>
            
        </div>
    );
};

export default PostDetail;
