import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import '../../style/reports/ReportModal.css'

const ReportCommentModal = ({ commentId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [description, setDescription] = useState('');
    const [reportTypes, setReportTypes] = useState([]);

    const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/reports`;
    const authToken = localStorage.getItem('token');

    const reportTypeToKorean = (type) => {
        switch (type) {
            case 'ABUSE': return '욕설';
            case 'OBSCENITY': return '음란';
            case 'DEFAMATION': return '비방';
            case 'SPAM': return '스팸 홍보/도배';
            case 'ILLEGAL_INFO': return '불법 정보';
            case 'HARMFUL_TO_TEENS': return '청소년 유해';
            default: return type;
        }
    };

    const fetchReportTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/types`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setReportTypes(response.data.data);
        } catch (error) {
            console.error('신고 유형 불러오기 실패:', error.message);
        }
    };

    useEffect(() => {
        fetchReportTypes();
    }, []);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmitReport = async () => {
        if (!selectedType) {
            alert('신고 유형을 선택해주세요.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/comment/${commentId}`, {
                reportType: selectedType,
                content: description,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            alert('신고가 완료되었습니다.');
            handleCloseModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('이미 신고를 했습니다.');
                handleCloseModal();
            } else {
                console.error(`신고 제출 실패: ${error}`);
            }
        }
    };

    return (
        <div className="report-container">
            <button className="btn-report" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faFlag} />
            </button>

            {isOpen && (
                <React.Fragment>
                <div className="overlay"></div>
                <div className="modal-container">
                    <h2>신고하기</h2>
                    <div className="modal-content">
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="" disabled>신고 유형을 선택하세요.</option>
                        {reportTypes.map((type, index) => (
                            <option key={index} value={type}>{reportTypeToKorean(type)}</option>
                        ))}
                    </select>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="신고 사유를 입력하세요." />
                    </div>
                    <div className="modal-buttons">
                        <button className="submitReport-button" onClick={handleSubmitReport}>신고 제출</button>
                        <button className="close-button" onClick={handleCloseModal}>닫기</button>
                    </div>
                </div>
            </React.Fragment>
            )}
        </div>
    );
};

export default ReportCommentModal;