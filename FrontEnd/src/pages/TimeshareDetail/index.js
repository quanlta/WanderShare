import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TimeshareDetail.module.scss';
import images from '../../assets/images';
import { ShopContext } from '../../context/Shop-Context';

const cx = classNames.bind(styles);
function TimeshareDetail() {
    const timeshareID = useParams();
    const [timeshare, setTimeshare] = useState(null);
    const { addToCart } = useContext(ShopContext);
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/timeshare')
            .then((res) => res.json())
            .then((timeshares) => {
                const findUser = timeshares.find((p) => {
                    return p.id == timeshareID.timeshareID;
                });
                if (findUser) {
                    setTimeshare(findUser);
                }
            });
    }, [timeshareID]);
    if (!timeshare) {
        return <div>This timeshare is not found</div>;
    }
    return (
        <div className={cx('container')}>
            <img src={images.timeshare_header} style={{ width: 100 + '%', height: 330 + 'px' }}></img>
            <div className={cx('content')}>
                <img src={timeshare.timeshare_image} className={cx('timeshare-img')}></img>
                <div className={cx('text')}>
                    <div className={cx('title')}>{timeshare.name}</div>
                    <div className={cx('shop')}>
                        <div className={cx('price')}>{timeshare.price}$</div>
                        <div className={cx('action')}>
                            <div className={cx('shopping-cart')}>
                                <FontAwesomeIcon icon={faCartPlus} className={cx('icon')}></FontAwesomeIcon>
                                <div className={cx('text_1')} onClick={() => addToCart(timeshare.id)}>
                                    <div>ADD TO CART</div>
                                    <div className={cx('free')}>Free delivery to your location</div>
                                </div>
                            </div>
                            <Link className={cx('shopping-cart')} to={`/compare/${timeshare.id}`}>
                                <FontAwesomeIcon icon={faNotEqual} className={cx('icon')}></FontAwesomeIcon>
                                <div className={cx('text_1')}>
                                    <div>COMPARE WITH OTHER TIMESHARES</div>
                                    <div className={cx('free')}>Select another timeshare to compare</div>
                                </div>
                            </Link>
                        </div>
                        {/* <Link to={`/compare/${timeshare.id}`} className={cx('compare')}>
                            so sanh
                        </Link> */}
                    </div>
                    <div className={cx('description')}>Describe :</div>
                    <div className={cx('des')}>{timeshare.description}</div>
                    <div className={cx('support')}>
                        <div className={cx('support-item')}>
                            <img src={images.support1} style={{ width: 40 + 'px', height: 40 + 'px' }}></img>
                            <div className={cx('text')}>
                                <h4 className={cx('title')}>Free Ship</h4>
                                <p className={cx('des')}>Free ship applies to all orders over $200</p>
                            </div>
                        </div>
                        <div className={cx('support-item')}>
                            <img src={images.support2} style={{ width: 40 + 'px', height: 40 + 'px' }}></img>
                            <div className={cx('text')}>
                                <h4 className={cx('title')}>Easy to Return</h4>
                                <p className={cx('des')}>Return immediately if the timeshare is incorrect or damaged</p>
                            </div>
                        </div>
                        <div className={cx('support-item')}>
                            <img src={images.support3} style={{ width: 40 + 'px', height: 40 + 'px' }}></img>
                            <div className={cx('text')}>
                                <h4 className={cx('title')}>Quick Support</h4>
                                <p className={cx('des')}>Contact customer care right on the website</p>
                            </div>
                        </div>
                        <div className={cx('support-item')}>
                            <img src={images.support4} style={{ width: 40 + 'px', height: 40 + 'px' }}></img>
                            <div className={cx('text')}>
                                <h4 className={cx('title')}>Diverse Payments</h4>
                                <p className={cx('des')}>Payment upon delivery, bank transfer, momo,...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeshareDetail;
