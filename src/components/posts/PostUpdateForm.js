import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/posts/PostUpdateForm.css';

const PostUpdateForm = () => {
    const MAX_TITLE_LENGTH = 100;
    const MAX_CONTENT_LENGTH = 100;

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [titleLength, setTitleLength] = useState(0);
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState('');
    const [contentLength, setContentLength] = useState(0);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');

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

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleLength(e.target.value.length);
        if (e.target.value.length) setTitleError('');
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setContentLength(e.target.value.length);
        if (e.target.value.length) setContentError('');
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        if (selectedFile) {
          setImageError('');
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setImagePreview(null);
          setImageError('이미지를 업로드해주세요.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        if (!title) { setTitleError('제목을 입력해주세요.'); hasError = true;}
        if (!content) { setContentError('내용을 입력해주세요.'); hasError = true;}
        if (!image) { setImageError('이미지를 업로드해주세요.'); hasError = true;}
        if (hasError) return;

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);

            await axios.patch(`${process.env.REACT_APP_HOST_URL}/api/v1/post/${id}`, formData, {
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
                                    style={{ maxWidth: '340px', maxHeight: '360px' }}
                                />
                            </div>
                        ) : (
                            <p>이미지 미리보기</p>
                        )}
                    </div>
    
                    <div className="form-right">
                        <label className="title-label">
                            제목:
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                maxLength={MAX_TITLE_LENGTH}
                            />
                            {titleError && <div style={{color: 'red'}}>{titleError}</div>}
                            <div style={{textAlign: 'right'}}>{titleLength}/{MAX_TITLE_LENGTH}</div>
                            {titleLength > MAX_TITLE_LENGTH && <div style={{color: 'red'}}>100글자까지만 작성 가능합니다.</div>}
                        </label>
                        <label className="content-label">
                            내용:
                            <textarea
                                value={content}
                                onChange={handleContentChange}
                                maxLength={MAX_CONTENT_LENGTH}
                            />
                            {contentError && <div style={{color: 'red'}}>{contentError}</div>}
                            <div style={{textAlign: 'right'}}>{contentLength}/{MAX_CONTENT_LENGTH}</div>
                            {contentLength > MAX_CONTENT_LENGTH && <div style={{color: 'red'}}>100글자까지만 작성 가능합니다.</div>}
                        </label>
                        <label className="upload-label">
                            이미지 업로드:
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {imageError && <div style={{color: 'red'}}>{imageError}</div>}
                        </label>
    
                        <div className="button-container">
                            <button className="postUploadBtn" type="submit">수정하기</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
    
};

export default PostUpdateForm;
