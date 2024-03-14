import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './ModalSuccess.module.scss';

const cx = classNames.bind(styles);

function ModalSuccess() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // Mở modal khi component được tạo
        openModal();
    }, []); // Truyền [] để đảm bảo hiệu ứng chỉ chạy 1 lần khi component được tạo

    return (
        <div>
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <div className={cx('close')}>
                            <span onClick={closeModal}>&times;</span>
                        </div>
                        <div className={cx('success-icon')}>
                            <FaCheckCircle className={cx('check-icon')} />
                        </div>
                        <div className={cx('success-message')}>
                            <p>Register success! </p>
                        </div>
                        <div className={cx('success-message2')}>
                            <p>Please check your email to verify.</p>
                        </div>
                        <div className={cx('success-message3')}>
                            <button>
                                <a href="https://mail.google.com/mail/u/0/#inbox" className="linkText">
                                    Email Here
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalSuccess;
