import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate, useParams } from 'react-router-dom'; // Add useParams
import axios from 'axios';
import '../../style/posts/PostUpdateForm.css';

const PostUpdateForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/post/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setImagePreview(response.data.imageUrl);
            } catch (error) {
                console.error('게시글 불러오기 중 오류 발생:', error.message);
            }
        };

        fetchPost();
    }, [id]);

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

            const authToken = localStorage.getItem('token');

            await axios.patch(`http://localhost:9000/api/v1/post/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('게시글이 성공적으로 수정되었습니다');
            navigate(`/`);
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error.message);
        }
    };

    return (
        <div className="post-container">
            <h2>멍스타그램 포스트 수정</h2>
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

                        <div className='button-container'>
                            <button type="submit">UPDATE</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostUpdateForm;