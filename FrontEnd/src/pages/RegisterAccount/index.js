import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterAccount.module.scss';
import { Link } from 'react-router-dom';
const initFormValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
};
//xu li chuoi rong
const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};
//xu li mail
const isUsernameValid = (username) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
};
//xu li phone
const isPhoneValid = (phone) => {
    return /^\d{10}$/.test(phone);
};
function RegisterPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for success message
    const [registrationFail, setRegistrationFail] = useState(false); // State for fail message
    // -----------------------------------------

    //post api
    const loginUser = async (username, email, password, phone) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/register',
                // "http://localhost:3000/users",

                {
                    username,
                    email,
                    password,
                    phone,
                    // confirmPassword,
                },
            );
            // Lưu thông tin người dùng đã đăng nhập vào localStorage
            if (response.data.statusCodeValue === 200 && response.data.statusCode === 'OK') {
                // Registration is successful
                setRegistrationSuccess(true);
                setRegistrationFail(false); // Reset fail message
                // Nếu phản hồi thành công, điều hướng người dùng đến trang /home
                window.location.href = '/login';
            } else {
                setRegistrationFail(true);
                setRegistrationSuccess(false);
                // Xử lý trường hợp phản hồi không thành công ở đây nếu cần
            }
        } catch (error) {
            // Xử lý lỗi ở đây

            console.error(error.message);
            console.error(error.config);
        }
    };

    // -----------------------------------------
    // xu li thong bao loi
    const validateForm = () => {
        const errors = {};

        if (isEmptyValue(formValue.username)) {
            errors.username = 'username is required';
        }
        //-
        if (isEmptyValue(formValue.email)) {
            errors.email = 'Email is required';
        } else if (!isUsernameValid(formValue.email)) {
            errors.email = 'Email is invalid';
        }
        //-
        if (isEmptyValue(formValue.password)) {
            errors.password = 'Password is required';
        }
        //-
        if (isEmptyValue(formValue.confirmPassword)) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (formValue.confirmPassword !== formValue.password) {
            errors.confirmPassword = 'Confirm password is not match';
        }
        if (isEmptyValue(formValue.phone)) {
            errors.phone = 'Phone number is required';
        } else if (!isPhoneValid(formValue.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        setFormError(errors);

        return Object.keys(errors).length === 0;
    };
    // xu li dang nhap
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            loginUser(formValue.username, formValue.email, formValue.password, formValue.phone);
        } else {
            console.log('form invalid');
        }
    };
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
                        <h2>Create an Account</h2>
                        {registrationSuccess && (window.location.href = '/success')}
                        {registrationFail && (
                            <div className={styles['fail-message']}>Registration failed. Please try again.</div>
                        )}
                        {/* username */}
                        <div className={styles.inputbox}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <input
                                type="text"
                                name="username"
                                value={formValue.username}
                                onChange={handleChange}
                                required
                            />
                            <label>Your Name</label>
                        </div>
                        {formError.username && <div className={styles['error-message']}>{formError.username}</div>}
                        {/* mail */}
                        <div className={styles.inputbox}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" name="email" value={formValue.email} onChange={handleChange} required />
                            <label>Email</label>
                        </div>
                        {formError.email && <div className={styles['error-message']}>{formError.email}</div>}
                        {/* password */}
                        <div className={styles.inputbox}>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                name="password"
                                value={formValue.password}
                                onChange={handleChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        {formError.password && <div className={styles['error-message']}>{formError.password}</div>}
                        {/* confirmPassword */}
                        <div className={styles.inputbox}>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formValue.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                        {formError.confirmPassword && (
                            <div className={styles['error-message']}>{formError.confirmPassword}</div>
                        )}
                        {/* phone */}
                        <div className={styles.inputbox}>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" name="phone" value={formValue.phone} onChange={handleChange} required />
                            <label>Phone</label>
                        </div>
                        {formError.phone && <div className={styles['error-message']}>{formError.phone}</div>}

                        <div className={styles.submit}>
                            <button>GET START</button>
                        </div>
                        <div className={styles.separator}></div>
                        {/* <div className={styles["login-gg"]}>{<GoogleLogin />}</div> */}
                        <div className={styles.register}>
                            <p>
                                Already have an account? <Link to={'/login'}>LOGIN HERE</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
