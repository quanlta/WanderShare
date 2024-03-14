import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LoginAccount.module.scss';
import { Link } from 'react-router-dom';

const initFormValue = {
    email: '',
    password: '',
};

// Check empty
const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
}

// Check email
const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

function LoginPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const [rememberMe, setRememberMe] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    // xử lí remember me
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedRememberMe = localStorage.getItem('rememberMe');

        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                setFormValue({
                    email: user.email,
                    password: '',
                });

                if (savedRememberMe === 'true') {
                    setRememberMe(true);
                } else {
                    setRememberMe(false);
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem('user');
                localStorage.removeItem('rememberMe');
            }
        }
    }, []);

    const saveLoginInfo = (user, access_token, refresh_token) => {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    };
    // post api
    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password,
            });

            const { user, access_token, refresh_token } = response.data;

            if (rememberMe) {
                saveLoginInfo(user, access_token, refresh_token);
            }
            if (response.data.statusCodeValue === 200 && response.data.statusCode === 'OK') {
                localStorage.setItem('access_token', response.data.body.access_token);
                localStorage.setItem('refresh_token', response.data.body.refesh_token);
                localStorage.setItem('username', response.data.body.username);
                localStorage.setItem('balance', response.data.body.balance);
                const token = response.data.body.access_token;
                const role = parseJwt(token).roles[0];
                localStorage.setItem('role', role);
                const id = parseJwt(token).sub;
                localStorage.setItem('id', id);
                if (role == 'USER') {
                    window.location.href = '/';
                } else {
                    window.location.href = '/admin';
                }
            } else {
                setLoginFail(true);
                // console.log("login fail, your acc not exists");
            }
        } catch (error) {
            console.error(error);
        }
    };
    // xử lí validate
    const validateForm = () => {
        const errors = {};
        if (isEmptyValue(formValue.email)) {
            errors.email = 'Email is required';
        } else if (!isEmailValid(formValue.email)) {
            errors.email = 'Email is invalid';
        }
        if (isEmptyValue(formValue.password)) {
            errors.password = 'Password is required';
        }
        setFormError(errors);
        return Object.keys(errors).length === 0;
    };
    //xu li dang nhap
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            loginUser(formValue.email, formValue.password);
        } else {
            console.log('Form invalid');
        }
    };
    // xử lí thay đổi input
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));
    };
    // lấy trạng thái checked or unchecked
    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };
    //form
    return (
        <section>
            <div className={styles['form-box']}>
                <div className={styles['form-value']}>
                    <form onSubmit={handleSubmit}>
                        <i>WELCOME TO BIRDCAGE WORLD</i>
                        <h2>Log In</h2>
                        {loginFail && (
                            <div className={styles['fail-message']}>
                                User account or password incorrect. Please try again.
                            </div>
                        )}
                        <div className={styles.inputbox}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" name="email" value={formValue.email} onChange={handleChange} required />
                            <label>Email</label>
                        </div>
                        {formError.email && <div className={styles['error-message']}>{formError.email}</div>}

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

                        <div className={styles.forget}>
                            <label>
                                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                                Remember Me
                            </label>
                            <Link to={'/forgot'}> Forgot Password</Link>
                        </div>

                        <div className={styles.submit}>
                            <button type="submit">Log in</button>
                        </div>
                        <div className={styles.separator}></div>

                        <div className={styles.register}>
                            <p>
                                New User? <Link to={'/register'}>REGISTER HERE</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
