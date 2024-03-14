import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import images from '../../assets/images';
import Sale from '../../components/layout/Sale';
import BestSeller from '../../components/layout/BestSeller';
import NewTimeshares from '../../components/layout/NewTimeshares';
import FeedBack from '../../components/layout/FeedBack';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-img')}>
                <img src={images.header_img} alt="birdcage_image"></img>
            </div>
            <div className={cx('container')}>
                {/* thanh support */}
                <div className={cx('support')}>
                    {/* <div className={cx('support-item')}>
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
                    </div> */}
                </div>
                {/* các kiểu lồng */}
                <div className={cx('thumb-wrapper')}>
                    {/* <div className={cx('thumb')}>
                        <img src={images.longbauduc} alt="Oval Cage" className={cx('thumb-img')}></img>
                        <div className={cx('text')}>
                            <h3 className={cx('title')}>Oval Cage</h3>
                            <Link to={'/timeshares'} className={cx('watchnow')}>
                                Watch now
                            </Link>
                        </div>
                    </div>
                    <div className={cx('thumb')}>
                        <img src={images.longhinhvuong} alt="square cage" className={cx('thumb-img')}></img>
                        <div className={cx('text')}>
                            <h3 className={cx('title')}>Square Cage</h3>
                            <Link to={'/timeshares'} className={cx('watchnow')}>
                                Watch now
                            </Link>
                        </div>
                    </div>
                    <div className={cx('thumb')}>
                        <img src={images.longdagiac} alt="Polygonal Cage" className={cx('thumb-img')}></img>
                        <div className={cx('text')}>
                            <h3 className={cx('title')}>Polygonal Cage</h3>
                            <Link to={'/timeshares'} className={cx('watchnow')}>
                                Watch now
                            </Link>
                        </div>
                    </div>
                    <div className={cx('thumb')}>
                        <img src={images.longkhac} alt="Cages of Other Shapes" className={cx('thumb-img')}></img>
                        <div className={cx('text')}>
                            <h3 className={cx('title')}>Cages of Other Shapes</h3>
                            <Link to={'/timeshares'} className={cx('watchnow')}>
                                Watch now
                            </Link>
                        </div>
                    </div> */}
                </div>
                {/* đang giảm giá */}
                <Sale />
                {/* được mua nhiều nhất */}
                <BestSeller />
                {/* body-img */}
                <div className={cx('body-img')}>
                    <img src={images.body_img}></img>
                </div>
                {/* các sản phẩm mới */}
                <NewTimeshares />
                {/* ảnh 2 sp*/}
                <div className={cx('classify')}>
                    <div className={cx('row')}>
                        <div className={cx('text')}>
                            <div className={cx('title')}>Metal Bird Cage</div>
                            <div className={cx('des')}>
                                Metals are generally more resistant to wear and corrosion than other materials such as
                                wood. This means that metal bird cages can last longer and maintain better condition
                                over time.
                            </div>
                            <Link to={'/timeshares'} className={cx('btn')}>
                                Watch now
                            </Link>
                        </div>
                        <img src={images.longkimloai}></img>
                    </div>
                    <div className={cx('row')}>
                        <img src={images.longgo}></img>
                        <div className={cx('text', 'woodcage')}>
                            <div className={cx('title')}>Wooden Bird Cage</div>
                            <div className={cx('des')}>
                                Wooden bird cages often have a more natural and aesthetic beauty than metal or plastic
                                cages. They can make your space cozy and in harmony with the natural environment.
                            </div>
                            <Link to={'/timeshares'} className={cx('btn')}>
                                Watch now
                            </Link>
                        </div>
                    </div>
                </div>
                {/* khách hàng nói gì */}
                <FeedBack />
            </div>
        </div>
    );
}

export default Home;
