import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUser, faCartShopping, faUsers, faCrow, faComments } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const Sidebar = () => {
    return (
        <div className={cx('sidebar')}>
            <div className={cx('top')}>
                <span className={cx('logo')}>
                    <span>Bird Cage</span>
                </span>
            </div>
            <hr />
            <div className={cx('center')}>
                <ul>
                    <p className={cx('title')}>MAIN</p>
                    <Link to={'/admin'}>
                        <li>
                            <FontAwesomeIcon icon={faChartSimple} className={cx('icon')}></FontAwesomeIcon>
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className={cx('title')}>SERVICE</p>
                    <Link to={'/admin/customer'}>
                        <li>
                            <FontAwesomeIcon icon={faUsers} className={cx('icon')}></FontAwesomeIcon>
                            <span>Customer</span>
                        </li>
                    </Link>
                    <Link to={'/adminorder'}>
                        <li>
                            <FontAwesomeIcon icon={faCartShopping} className={cx('icon')}></FontAwesomeIcon>
                            <span>Order</span>
                        </li>
                    </Link>
                    <Link to={'/admin/timeshares'}>
                        <li>
                            <FontAwesomeIcon icon={faCrow} className={cx('icon')}></FontAwesomeIcon>
                            <span>Timeshares</span>
                        </li>
                    </Link>
                    <Link to={'/admin/comment'}>
                        <li>
                            <FontAwesomeIcon icon={faComments} className={cx('icon')}></FontAwesomeIcon>
                            <span>Comment</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};
export default Sidebar;
