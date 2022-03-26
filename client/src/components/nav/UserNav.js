import React from 'react';
import {Link} from 'react-router-dom';

const UserNav = () => {
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history">History</Link>
            </li>
        </ul>
    </nav>
}
export default UserNav;