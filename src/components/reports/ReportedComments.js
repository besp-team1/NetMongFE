// ReportedComments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/reports/Reported.css'

function ReportedComments() {
    const [comments, setComments] = useState([]);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:9000/api/v1/admin/reports/comments', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            if(response.data.success) {
            setComments(response.data.data);
            } else {
            console.error('Failed to fetch reported comments', response.data.msg);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    return (
        <div className='reported-comments'>
        <h2 className='subtitle'>신고된 댓글</h2>
        <table className='reported-item'>
            <thead>
            <tr>
                <th>신고된 게시글 ID</th>
                <th>신고 타입</th>
                <th>신고 내용</th>
                <th>신고 횟수</th>
                <th>블라인드 여부</th>
            </tr>
            </thead>
            <tbody>
            {comments.map((comment, index) => (
                <tr key={index}>
                <td>{comment.reportedPostId}</td>
                <td>{comment.reportType}</td>
                <td>{comment.content}</td>
                <td>{comment.reportCount}</td>
                <td>{comment.isBlinded ? '블라인드 처리 완료' : '블라인드 되지 않음'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ReportedComments;
