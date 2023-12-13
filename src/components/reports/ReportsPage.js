import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/reports/ReportsPage.css'

function ReportsPage() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        // 신고된 게시글 가져오기
        axios.get('http://localhost:9000/api/v1/admin/reports/posts', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            if(response.data.success) {
            setPosts(response.data.data);
            } else {
            console.error('Failed to fetch reported posts', response.data.msg);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

        // 신고된 댓글 가져오기
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
        <div className="reports-page">
            <h1 className="title">신고 관리</h1>
            <h2 className="subtitle">신고된 게시글</h2>
            {posts.map((post, index) => (
                <div key={index} className="report-card">
                <p className="report-detail">신고 타입: {post.reportType}</p>
                <p className="report-detail">신고 내용: {post.content}</p>
                <p className="report-detail">신고된 게시글 ID: {post.reportedPostId}</p>
                </div>
            ))}
            <h2 className="subtitle">신고된 댓글</h2>
            {comments.map((comment, index) => (
                <div key={index} className="report-card">
                <p className="report-detail">신고 타입: {comment.reportType}</p>
                <p className="report-detail">신고 내용: {comment.content}</p>
                <p className="report-detail">신고된 게시글 ID: {comment.reportedPostId}</p>
                <p className="report-detail">신고 횟수: {comment.reportCount}</p>
                <p className="report-detail">블라인드 여부: {comment.isBlinded ? '블라인드 됨' : '블라인드 되지 않음'}</p>
                </div>
            ))}
            </div>
        );
}

export default ReportsPage;
