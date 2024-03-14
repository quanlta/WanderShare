import { useState } from 'react';
import styles from './PassWordModal.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const username = localStorage.getItem('username');
function PassWordModal() {
    const token = localStorage.getItem('access_token');
    const [show, setShow] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [conFirmPass, setConFirmPass] = useState('');
    const [style, setStyle] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async () => {
        if (newPass === conFirmPass) {
            fetch(
                `http://localhost:8080/api/v1/user/change-pass?token=${token}&oldPassword=${oldPass}&password=${newPass}`,
                {method: 'POST'}
            );
            setShow(false);
            window.location.href = '/info';
        } else {
            setStyle({ display: 'block' });
        }
    };
    return (
        <>
            <FontAwesomeIcon icon={faPencil} className={cx('pencil')} onClick={handleShow}></FontAwesomeIcon>
            {show && (
                <div className={cx('wrapper')}>
                    <div className={cx('modal')}>
                        <FontAwesomeIcon icon={faXmark} className={cx('close')} onClick={handleClose}></FontAwesomeIcon>
                        <div className={cx('title')}>Update PassWord</div>
                        <div className={cx('content')}>
                            <label className={cx('new-username')}>Old password :</label>
                            <input
                                type="password"
                                placeholder="Enter your old password"
                                className={cx('input-user')}
                                onChange={(e) => setOldPass(e.target.value)}
                            />
                            <label className={cx('new-username')}>New password :</label>
                            <input
                                type="password"
                                placeholder="Enter your new password"
                                className={cx('input-user')}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            <label className={cx('new-username')}>Confirm password :</label>
                            <input
                                type="password"
                                placeholder="Enter your new password"
                                className={cx('input-user')}
                                onChange={(e) => setConFirmPass(e.target.value)}
                            />
                        </div>
                        <div style={style} className={cx('error')}>
                            Your confirmation password is incorrect !
                        </div>
                        <div className={cx('btn')}>
                            <div className={cx('cancle')} onClick={handleClose}>
                                Cancel
                            </div>
                            <div className={cx('add')} onClick={handleAdd}>
                                Confirm
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PassWordModal;