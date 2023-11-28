import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();  // URL 파라미터에서 게시글의 ID를 가져옵니다.
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZTEyNyIsImF1dGgiOiJtZW1iZXIiLCJleHAiOjE3MDEyMzcwODF9.5KNse_Egy3cFvoLleXnjgdXINWxtNcuMYJbtKfeD2GFhw7UVu7opbJBKxPjLL_0YB-p04hE3FIAlJ8s-hxlzyA`}`,
                    },
                });
                setPost(response.data.data);  // API 응답에서 게시글 데이터를 가져와 상태를 업데이트합니다.
            } catch (error) {
                console.error('게시글 불러오는 중 오류 발생:', error.message);
            }
        };

        fetchPost();  // 게시글을 불러옵니다.
    }, [id]);  // 게시글의 ID가 바뀔 때마다 게시글을 다시 불러옵니다.

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;  // 게시글이 아직 불러와지지 않았을 때는 로딩 메시지를 표시합니다.
    }

    // 게시글이 불러와졌을 때는 게시글의 제목, 작성자, 내용, 이미지를 표시합니다.
    return (
        <div>
            <h1>{post.title}</h1>
            <p>작성자: {post.writer}</p>
            <p>{post.content}</p>
            {post.imageUrl && <img src={`http://localhost:9000/${post.imageUrl}`} alt="게시글 이미지" />}
        </div>
    );
};

export default PostDetail;
