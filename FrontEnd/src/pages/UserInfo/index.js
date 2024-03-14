import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './UserInfo.module.scss';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserNameModal from '../../components/layout/UserNameModal';
import PassWordModal from '../../components/layout/PassWordModal';


const cx = classNames.bind(styles);
const id = localStorage.getItem('id');
function UserInfo() {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getUserById();
    }, []);
    const getUserById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/user/profile?id=${id}`);
        if (res && res.data) {
            setUser(res.data[0]);
        }
    };
    return (
        <div>
            <img src={images.timeshare_header} style={{ width: 100 + '%', height: 330 + 'px' }}></img>
            <div className={cx('personal-page')}>Personal Page</div>
            <div className={cx('mycontent')}>
                <div className={cx('left')}>
                    <div className={cx('mybox')}>
                        <div className={cx('acc')}>account page</div>
                        <div className={cx('hello')}>
                            Hello, <span className={cx('uname')}>{user.username}</span>
                        </div>
                    </div>
                    <img className={cx('avatar')} src={images.avata}></img>
                    <div className={cx('name')}>{user.username}</div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('acc-info')}>ACCOUNT INFORMATION</div>
                    <div className={cx('myrow')}>
                        <span className={cx('title')}>User Name</span>
                        <span className={cx('des')}>{user.username}</span>
                        <UserNameModal />
                    </div>
                    <div className={cx('myrow')}>
                        <span className={cx('title')}>Email</span>
                        <span className={cx('des')}>{user.email}</span>
                    </div>
                    <div className={cx('myrow')}>
                        <span className={cx('title')}>Balance</span>
                        <span className={cx('des')}>{user.balance}</span>
                    </div>
                    <div className={cx('myrow')}>
                        <span className={cx('title')}>Phone</span>
                        <span className={cx('des')}>{user.phone}</span>
                    </div>
                    <div className={cx('myrow')}>
                        <span className={cx('title')}>PassWord</span>
                        <span className={cx('des')}>********</span>
                        <PassWordModal />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
