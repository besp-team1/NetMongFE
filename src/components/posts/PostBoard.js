import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/posts/PostBoard.css';
import { useInView } from 'react-intersection-observer';

function PostBoard() {
    const authToken = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();

    const navigate = useNavigate();

    useEffect(() => {
        if (inView) {
            fetchPosts(currentPage);
        }
    }, [inView]);

    const fetchPosts = async (pageNumber) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/view?page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const data = res.data.data;
            if (data.totalElements !== totalCnt || data.totalPages >= currentPage) {
                const updatedPosts = await Promise.all(data.content.map(async (post) => {
                    const likedCount = await fetchLikesCount(post.postId);

                    return {
                        ...post,
                        likedCount,
                    };
                }));

                setPosts([...posts, ...updatedPosts]);
                setCurrentPage((currentPage) => currentPage + 1);
            }
            setTotalCnt(data.totalElements);
            setLoading(false);
        } catch (error) {
            console.error('포스트를 가져오는데 실패했습니다:', error);
            setLoading(false);
        }
    };

    const fetchLikesCount = async (postId) => {
        const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/likes/${postId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return res.data.data.likedCount;
    };

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="postItem" key={post.postId}>
                        <Link to={`/members/${post.writer}`}>
                            <h3 className="postItem-username">{post.writer}</h3>
                        </Link>
                        <img className="postItem-image" src={`${process.env.REACT_APP_IMAGE_URL}/${post.imageUrl}`} alt="post image" />
                        <p className="postItem-likesCount">{post.likedCount}명이 좋아합니다.</p>
                        <Link to={`/post/${post.postId}`} className="postItem-title">
                            <h4 className="postItem-title-text">{post.title}</h4>
                        </Link>
                        <p className="postItem-content">{post.content.split(/(#[^\s]+)/g).map((v, i) => {
                            if (v.match(/#[^\s]+/)) {
                                return <Link key={i} to={`/post/hashtagSearch?hashtag=${v.slice(1)}`}>{v}</Link>;
                            }
                            return v;
                        })}</p>
                        <p className="postItem-date">{post.createDate}</p>
                    </div>
                ))
            ) : (
                <div className="emptyPosts">
                    아직 아무도 게시글을 작성하지 않았어요.<br />첫 번째로 게시글을 남겨주세요.
                </div>
            )}
            <div ref={ref} style={{ "marginTop": "200px" }} className="loading-message">포스트를 불러오는 중...</div>
            {loading && <p></p>}
        </div>
    );
    
}

export default PostBoard;
