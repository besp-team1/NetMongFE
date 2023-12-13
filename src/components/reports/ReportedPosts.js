// ReportedPosts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/reports/Reported.css'

function ReportedPosts() {
    const [posts, setPosts] = useState([]);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
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
    }, []);

    return (
        <div className='reported-posts'>
        <h2 className='subtitle'>신고된 게시글</h2>
        <table className='reported-item'>
            <thead>
            <tr>
                <th>신고된 게시글 ID</th>
                <th>신고 타입</th>
                <th>신고 내용</th>
            </tr>
            </thead>
            <tbody>
            {posts.map((post, index) => (
                <tr key={index}>
                <td><Link to={`/post/${post.reportedPostId}`}>{post.reportedPostId}</Link></td>
                <td>{post.reportType}</td>
                <td>{post.content}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ReportedPosts;
