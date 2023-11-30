import React, { useEffect, useState } from 'react';
import { getCommentsOfPark } from '../../API/parkApi';
import '../../style/parks/ParkCommentList.css';

const ParkCommentList = ({ parkId }) => {
    const [comments, setComments] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 1,
        totalElements: 1
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        getCommentsOfPark(parkId, page, setComments, setPageInfo);
    }, [parkId, page]);

    const pageNumbers = [];
    for (let i = 1; i <= pageInfo.totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="comment-list-container">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-username">{comment.username}</div>
                    <div className="comment-content">{comment.content}</div>
                </div>
            ))}
            <div className="pagination">
                <button onClick={() => setPage(Math.max(page - 1, 1))}>{"<"}</button>
                {pageNumbers.map((number) => (
                    <button 
                        key={number} 
                        onClick={() => setPage(number)}
                        className={page === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => setPage(Math.min(page + 1, pageInfo.totalPages))}>{">"}</button>
            </div>
        </div>
    );
};

export default ParkCommentList;
