import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../style/reports/ReportsPage.css'

function ReportsPage() {
    return (
        <div className='reports-page'>
            <div className='header'>
                <h1>신고 관리</h1>
                <nav>
                    <Link to="posts">신고된 게시글</Link> | <Link to="comments">신고된 댓글</Link>
                </nav>
            </div>
            <Outlet />
        </div>
    );
}

export default ReportsPage;
