import classNames from 'classnames/bind';
import styles from './OrderSucess.module.scss';
import logo from '../../../assets/images/logo.png';
import images from '../../../assets/images';
import { useOrder } from '../../../context/Order-Context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
const OrderSucess = () => {
    const order = [];
    localStorage.setItem('shopCart', JSON.stringify(order));
    console.log('mag', []);
    let data = localStorage.getItem('dataSuccess');
    const orderData = JSON.parse(data);
    console.log('da', orderData);
    const backClick = () => {
        window.location.href = '/';
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={logo} alt="" />
            </div>
            <div className={cx('content')}>
                <div className={cx('content-box')}>
                    <div className={cx('content-box-left')}>
                        <div className={cx('content-box-left-title')}>
                            <img src={images.sucess} alt="" />
                            <div className={cx('thank-text')}>
                                <h3 className={cx('thank')}>Thank you for your order</h3>
                                <h3>
                                    A confirmation email has been sent to {orderData.orderDetail.user_id}. Please check
                                    your email
                                </h3>
                            </div>
                        </div>
                        <img className={cx('content-box-left-image')} src={images.giohangonl} alt="" />
                    </div>
                    <div className={cx('content-box-right')}>
                        <div className={cx('content-footer-btn')} onClick={backClick}>
                            <button className={cx('content-footer-btn-order')} id="orderButton">
                                Continue shopping
                            </button>
                        </div>
                        <img className={cx('content-box-right-image')} src={images.thankyou} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderSucess;
