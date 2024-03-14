import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import images from '../../assets/images';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import OrderList from './OrderList/OrderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../context/Shop-Context';
import { useOrder } from '../../context/Order-Context';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
export const Order = () => {
    const { calculateTotalQuantity } = useContext(ShopContext);
    const [payment, setPayment] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [error, setError] = useState('');
    const userid = localStorage.getItem('id');
    const [provinces, setProvinces] = useState([]);
    const [provincesCode, setProvincesCode] = useState('');
    const [districts, setDistricts] = useState([]);
    const [districtsCode, setDistrictsCode] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    useEffect(() => {
        // get dia chi
        axios
            .get(`http://localhost:8080/api/v1/address/getByUserID?id=${userid}`)
            .then((response) => {
                setAddress(response.data);
            })
            .catch((error) => {
                console.error('Error fetching addresses:', error);
            });
        //add dia chi
    }, [userid]);
    // add them dia chi vao

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getAPI1();
    }, []);

    useEffect(() => {
        if (provincesCode) {
            getAPI2();
        }
    }, [provincesCode]);
    //lay api tinh
    const getAPI1 = async () => {
        await axios.get('https://provinces.open-api.vn/api/').then((res) => {
            if (res && res.data) {
                if (res) setProvinces(res.data);
            }
        });
    };
    // tim huyen theo code
    const getAPI2 = async () => {
        await axios.get('https://provinces.open-api.vn/api/?depth=2').then((res) => {
            if (res && res.data) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].name == provincesCode) {
                        setDistricts(res.data[i].districts);
                    }
                }
            }
        });
    };
    const handleProvinceChange = (e) => {
        setProvincesCode(e.target.value);
    };
    const handleDistrictChange = (e) => {
        setDistrictsCode(e.target.value);
    };
    const handleAdd = async () => {
        let data = {
            userid: userid,
            address_shipping: `${street}/${districtsCode}/${provincesCode}`,
            name: name,
            email: email,
            phone: phone,
        };

        await axios.post('http://localhost:8080/api/v1/address/add', data).then((res) => {
            if (res.data == 200) {
                window.location.href = '/order';
            }
        });
    };
    // payment
    const handlePaymentChange = (event) => {
        setPayment(event.target.value);
        setError('');
    };
    // bắt buộc nhập
    //kiểm tra các thông tin đã điền chưa
    // const isFormValid = () => {
    //     return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '' && streetAddress.trim() !== '';
    // };
    // Lấy dữ liệu từ Local Storage
    const orderdata = JSON.parse(localStorage.getItem('shopCart'));

    /// hàm dùng để giữ dữ liệu address
    const handleAddressChange = (event) => {
        setSelectedAddress(JSON.parse(event.target.value));
        setError('');
    };
    console.log('select', selectedAddress);
    const handleOrderClick = () => {
        if (selectedAddress && payment) {
            // const dataOrder = {
            //     dataDelivery: ordersucess.shippingInfo,
            //     dataProducts: orderdata,
            // };
            selectedAddress.payment_method = payment;
            selectedAddress.address_id = selectedAddress.id;
            delete selectedAddress.id;
            selectedAddress.address = selectedAddress.address_shipping;
            delete selectedAddress.address_shipping;
            selectedAddress.user_id = selectedAddress.userid;
            delete selectedAddress.userid;

            const data = {
                address: selectedAddress,
                dataOrderRequests: orderdata,
            };
            axios
                .post('http://localhost:8080/api/v1/order', data)
                .then((response) => {
                    // Kiểm tra mã trạng thái HTTP
                    if (response.status === 200) {
                        // Xử lý khi API trả về  trạng thái HTTP 200 (OK)
                        console.log('API response:', response.data);
                        localStorage.setItem('dataSuccess', JSON.stringify(response.data.body));
                        navigate('/ordersucess');
                    } else {
                        // Xử lý khi API trả về trạng thái HTTP khác 200
                        console.error('status:', response.status);
                    }
                })
                .catch((error) => {
                    // Xử lý lỗi khi gọi API không thành công
                    console.error('API error:', error);
                    alert('An error .');
                });
            navigate('/ordersucess');
        } else if (selectedAddress && !payment) {
            alert('Please select an payment method.');
        } else {
            alert('Please select an address ');
        }
    };
    return (
        <div className={cx('container')}>
            {/* // show modal ở đây  */}
            {showModal && (
                <div className={cx('modalBackground')}>
                    <div className={cx('modalContainer')}>
                        <div className={cx('titleCloseBtn')}>
                            <button onClick={closeModal}>X</button>
                        </div>
                        <div className={cx('in4')}>
                            <div className={cx('user-in4')}>
                                <div className={cx('name')}>
                                    <p className={cx('user-in4-text')}>Name</p>
                                    <input
                                        type="text"
                                        placeholder="Nguyen Thanh "
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className={cx('phone')}>
                                    <p className={cx('user-in4-text')}>Phone</p>
                                    <input
                                        type="text"
                                        placeholder="0912*******"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('address')}>
                                <p>Street address</p>
                                <input
                                    type="text"
                                    placeholder="200 Nguyen Hue"
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div className={cx('city-address')}>
                                <div className={cx('city')}>
                                    <p className={cx('text')}>Province</p>
                                    <select
                                        id="province"
                                        className={cx('select')}
                                        onChange={handleProvinceChange}
                                        value={provincesCode}
                                    >
                                        <option disabled value="">
                                            Select Provinces ...
                                        </option>
                                        {provinces.map((province) => {
                                            return (
                                                <option key={province.code} value={province.name}>
                                                    {province.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className={cx('district')}>
                                    <p className={cx('text')}>District</p>
                                    <select
                                        id="district"
                                        className={cx('select')}
                                        onChange={handleDistrictChange}
                                        value={districtsCode}
                                    >
                                        <option disabled value="">
                                            Select District ...
                                        </option>
                                        {districts.map((district) => {
                                            return (
                                                <option key={district.code} value={district.name}>
                                                    {district.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className={cx('email')}>
                                <p>Email address</p>
                                <input
                                    type="text"
                                    placeholder="thanhcong@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <button onClick={closeModal} className={cx('cancel')}>
                                Cancel
                            </button>
                            <button onClick={handleAdd}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('ship-in4')}>
                            <div className={cx('header')}>
                                <div className={cx('title')}>Shipping Address</div>
                                <button className={cx('add-new-address')} onClick={openModal}>
                                    Add address
                                </button>
                            </div>
                            <div className={cx('list-address')}>
                                <div className={cx('list-address-radio-box')}>
                                    {address.map((add) => (
                                        <div key={address.id} className={cx('list-address-radio-box-in4')}>
                                            <input
                                                type="radio"
                                                name="address"
                                                value={JSON.stringify(add)}
                                                onChange={handleAddressChange}
                                            />
                                            <div className={cx('radio-box-in4-content')}>
                                                <div className={cx('name-phone')}>
                                                    <div className={cx('name')}>
                                                        <div className={cx('text')}>Name:</div>
                                                        <div className={cx('data')}>{add.name}</div>
                                                    </div>
                                                    <div className={cx('divider')}></div>
                                                    <div className={cx('phone')}>
                                                        <div className={cx('text')}>Phone:</div>
                                                        <div className={cx('data')}>{add.phone}</div>
                                                    </div>
                                                </div>
                                                <div className={cx('address-ship')}>
                                                    <div className={cx('text')}>Address:</div>
                                                    <div className={cx('data')}>{add.address_shipping}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('payment-in4')}>
                            <h1 className={cx('title')}>Payment details</h1>
                            <div className={cx('payment-content')}>
                                <div className={cx('payment-content-radio-box')}>
                                    <div className={cx('cod')}>
                                        <div className={cx('cod-content')}>
                                            <input
                                                className={cx('radio')}
                                                type="radio"
                                                name="paymentMethod"
                                                onChange={handlePaymentChange}
                                                value={1}
                                            />
                                            <img
                                                src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=5"
                                                className={cx('image')}
                                            />
                                            <div className={cx('text')}>Payment on delivery</div>
                                        </div>
                                    </div>
                                    <div className={cx('atm')}>
                                        <div className={cx('atm-content')}>
                                            <input
                                                className={cx('radio')}
                                                type="radio"
                                                name="paymentMethod"
                                                onChange={handlePaymentChange}
                                                value={2}
                                            />
                                            <img
                                                src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=5"
                                                className={cx('image')}
                                            />
                                            <div className={cx('text')}>VNPAY Payment Gateway</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('right-content')}>
                        <div className={cx('right-content-header')}>
                            <div className={cx('list-order-in4')}>
                                <OrderList />
                            </div>
                            <div className={cx('content-footer-btn')}>
                                <div className={cx('content-footer-btn-link')}>
                                    <Link to={'/Cart'} className={cx('content-footer-btn-link-title')}>
                                        <span className={cx('content-footer-btn-link-icon')}>
                                            <FontAwesomeIcon icon={faAnglesLeft} />
                                        </span>
                                        Back to cart
                                    </Link>
                                </div>

                                <button
                                    id="orderButton"
                                    onClick={handleOrderClick}
                                    className={cx('content-footer-btn-order')}
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
