import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.scss';
import { Link } from 'react-router-dom';

const initFormValue = {
    email: '',
    phone: '',
};

// Check empty
const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

// Check email
const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
//xu li phone
const isPhoneValid = (phone) => {
    return /^\d{10}$/.test(phone);
};
function ForgotPassword() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const [forgotSuccess, setForgotSuccess] = useState(false); // State for success message
    const [forgotFail, setForgotFail] = useState(false);
    //post api
    const loginUser = async (email, phone) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
                email,
                phone,
            });
            if (response.data === 'Please check inbox email') {
                // Registration is successful
                setForgotSuccess(true);
                setForgotFail(false); // Reset fail message
                // Nếu phản hồi thành công, điều hướng người dùng đến trang /home
            } else {
                setForgotFail(true);
                setForgotSuccess(false);
                // Xử lý trường hợp phản hồi không thành công ở đây nếu cần
            }
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error(error);
        }
    };
    // -----------------------------------------
    // xử lí validate
    const validateForm = () => {
        const errors = {};

        if (isEmptyValue(formValue.email)) {
            errors.email = 'Email is required';
        } else if (!isEmailValid(formValue.email)) {
            errors.email = 'Email is invalid';
        }

        if (isEmptyValue(formValue.phone)) {
            errors.phone = 'Phone number is required';
        } else if (!isPhoneValid(formValue.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        setFormError(errors);

        return Object.keys(errors).length === 0;
    };
    //xu li dang nhap
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            loginUser(formValue.email, formValue.phone);
        } else {
            console.log('Form invalid');
        }
    };
    // xử lí thay đổi input
    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: name === 'phone' ? String(value) : value,
        });
    };
    //form
    return (
        <section>
            <div className={styles['form-box']}>
                <div className={styles['form-value']}>
                    <form onSubmit={handleSubmit}>
                        <h2>Forgot password</h2>
                        {forgotSuccess && (
                            <div className={styles['success-message']}>
                                Password has been changed please check your email
                                <br></br>
                                <Link to={'/login'}>log in</Link>
                            </div>
                        )}
                        {forgotFail && (
                            <div className={styles['fail-message']}>User with email and phone doesn't exists</div>
                        )}
                        <div className={styles.inputbox}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" name="email" value={formValue.email} onChange={handleChange} required />
                            <label>Email</label>
                        </div>
                        {formError.email && <div className={styles['error-message']}>{formError.email}</div>}

                        <div className={styles.inputbox}>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" name="phone" value={formValue.phone} onChange={handleChange} required />
                            <label>Phone</label>
                        </div>
                        {formError.phone && <div className={styles['error-message']}>{formError.phone}</div>}

                        <div className={styles.submit}>
                            <button type="submit">Verifly</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
