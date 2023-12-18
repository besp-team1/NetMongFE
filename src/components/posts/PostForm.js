import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/posts/PostForm.css';

const PostForm = () => {
    const MAX_TITLE_LENGTH = 100;
    const MAX_CONTENT_LENGTH = 100;

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
        if (!title) {
            setTitleError('제목을 입력해주세요.');
            hasError = true;
        }
        if (!content) {
            setContentError('내용을 입력해주세요.');
            hasError = true;
        }
        if (!image) {
            setImageError('이미지를 업로드해주세요.');
            hasError = true;
        }
        if (hasError) return;

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);

            const authToken = localStorage.getItem('token');

            const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/api/v1/post/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('게시글이 성공적으로 업로드되었습니다:', response.data);

            // 게시글 업로드 후 메인 페이지로 이동합니다.
            navigate(`/`);
        } catch (error) {
            console.error('게시글 업로드 중 오류 발생:', error.message);
        }
    };
    return (
      <div className="post-container">
          <h2>멍스타그램 포스트 작성</h2>
          <h6>오늘 우리 집 멍멍이를 널리 알려주세요!</h6>
          <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                  <div className="form-left">
                      {imagePreview ? (
                          <div>
                              <img src={imagePreview} alt="이미지 미리보기" style={{ maxWidth: '200px', maxHeight: '200px' }} />
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
                          {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                          <div style={{ textAlign: 'right' }}>{titleLength}/{MAX_TITLE_LENGTH}</div>
                          {titleLength > MAX_TITLE_LENGTH && <div style={{ color: 'red' }}>100글자까지만 작성 가능합니다.</div>}
                      </label>
                      <label className="content-label">
                          내용:
                          <textarea
                              value={content}
                              onChange={handleContentChange}
                              maxLength={MAX_CONTENT_LENGTH}
                          />
                          {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
                          <div style={{ textAlign: 'right' }}>{contentLength}/{MAX_CONTENT_LENGTH}</div>
                          {contentLength > MAX_CONTENT_LENGTH && <div style={{ color: 'red' }}>100글자까지만 작성 가능합니다.</div>}
                      </label>
                      <label className="upload-label">
                          이미지 업로드:
                          <input type="file" accept="image/*" onChange={handleFileChange} />
                          {imageError && <div style={{ color: 'red' }}>{imageError}</div>}
                      </label>

                      <div className='button-container'>
                          <button type="submit">UPLOAD</button>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  );
};

export default PostForm;
