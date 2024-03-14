import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../../context/Shop-Context';
import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import axios from 'axios';
import { Order } from '../Order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const OrderList = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [timeshares, setTimeshares] = useState([]);
    const [timesharesReady, setTimesharesReady] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        axios.get('http://localhost:8080/api/v1/timeshare').then((response) => {
            setTimeshares(response.data);
            setTimesharesReady(true); // Đánh dấu rằng dữ liệu sản phẩm đã sẵn sàng
            console.log(timeshares);
        });

        // Lấy dữ liệu từ Local Storage
        const cartData = JSON.parse(localStorage.getItem('shopCart'));

        const updatedCartItems = [];
        let totalQuantity = 0;
        let totalPrice = 0;
        //  truy xuất thông tin nếu dữ liệu  true
        if (timesharesReady) {
            for (const item of cartData) {
                const timeshareId = item.id;
                const quantity = item.value;
                const timeshare = timeshares.find((p) => p.id === timeshareId);
                if (timeshare) {
                    const totaltimesharePrice = timeshare.price * quantity;

                    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
                    setTotalPrice((prevTotalPrice) => prevTotalPrice + totaltimesharePrice);

                    updatedCartItems.push({
                        id: timeshareId,
                        name: timeshare.name,
                        price: timeshare.price,
                        quantity,
                        totaltimesharePrice,
                        image: timeshare.timeshare_image,
                    });
                }
            }
        }

        setOrderItems(updatedCartItems);
    }, [timesharesReady]);
    let ship = 0;
    if (totalQuantity >= 3) {
        ship = 0;
    } else {
        ship = 7;
    }
    console.log('order', orderItems);
    return (
        <div className={cx('order')}>
            <h2 className={cx('title')}>Order ({totalQuantity} timeshares)</h2>
            <div className={cx('order-item')}>
                {orderItems.map((item) => (
                    <div className={cx('content')}>
                        <div className={cx('left-content')}>
                            <div className={cx('quantity')}>
                                <div className={cx('quantity-number')}>{item.quantity}</div>
                            </div>
                            <div className={cx('description')}>
                                <div className={cx('image')}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={cx('name')}>{item.name}</div>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <div className={cx('description')}>{item.price}$</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('divider')}></div>
            <div className={cx('content-footer')}>
                <div className={cx('content-footer-estimated')}>
                    <span className={cx('content-footer-estimated-title')}>Estimated Price :</span>
                    <span className={cx('content-footer-estimated-price')}>{totalPrice}$</span>
                </div>
                <div className={cx('content-footer-ship')}>
                    <span className={cx('content-footer-ship-title')}>Shipping Fee :</span>
                    <span className={cx('content-footer-ship-price')}>{totalQuantity >= 3 ? '0$' : '7$'}</span>
                </div>
                <div className={cx('divider')}></div>
                <div className={cx('content-footer-total')}>
                    <span className={cx('content-footer-total-title')}>Total :</span>
                    <span className={cx('content-footer-total-price')}>{totalPrice + ship}$</span>
                </div>
            </div>
        </div>
    );
};
export default OrderList;
