import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/posts/PostUpdateForm.css';

const PostUpdateForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const authToken = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setTitle(response.data.title || '');
                setContent(response.data.content || '');
                // 이미지 초기값 설정
                setImage(response.data.imageUrl || null);
                setImagePreview(response.data.imageUrl || null);
            } catch (error) {
                console.error('게시글 불러오기 중 오류 발생:', error.message);
            }
        };

        fetchPost();
    }, [id, authToken]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);

            await axios.patch(`http://localhost:9000/api/v1/post/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('게시글이 성공적으로 수정되었습니다');
            navigate(`/post/${id}`);
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error.message);
        }
    };

    return (
        <div className="post-container">
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-row">
                    <div className="form-left">
                        {imagePreview ? (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="이미지 미리보기"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        ) : (
                            <p>이미지 미리보기</p>
                        )}
                    </div>

                    <div className="form-right">
                        <label className="title-label">
                            제목:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label className="content-label">
                            내용:
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                        </label>
                        <label className="upload-label">
                            이미지 업로드:
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </label>

                        <div className="button-container">
                            <button type="submit">UPDATE</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostUpdateForm;
