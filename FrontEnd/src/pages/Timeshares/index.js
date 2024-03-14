import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Timeshares.module.scss';
import images from '../../assets/images';
import ListTimeshares from '../../components/layout/ListTimeshares';
import ListTimesharesAscByPrice from '../../components/layout/ListTimesharesAscByPrice';
import ListTimesharesDescByPrice from '../../components/layout/ListTimesharesDescByPrice';
import ListTimesharesAscByName from '../../components/layout/ListTimesharesAscByName';
import ListTimesharesDescByName from '../../components/layout/ListTimesharesDescByName';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Timeshares() {
    const [index, setIndex] = useState(0);
    console.log('index', index);
    return (
        <div className={cx('container')}>
            <img src={images.timeshare_header} style={{ width: 100 + '%', height: 330 + 'px' }}></img>
            <div className={cx('alltimeshare')}>All Timeshares</div>
            <div className={cx('content')}>
                {/* 4 sản phẩm đầu tiên */}
                <div className={cx('thumb-wrapper')}>
                    <div className={cx('thumb')}>
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
                    </div>
                </div>
                <div className={cx('text')}>
                    <h2 className={cx('title')}>All Timeshares</h2>
                    <img src={images.hoa}></img>
                </div>
                <div className={cx('filter')}>
                    <FontAwesomeIcon icon={faArrowUpAZ} className={cx('icon')}></FontAwesomeIcon>
                    <span className={cx('sortby')}> Sort by :</span>
                    <div
                        className={cx('btn')}
                        onClick={() => {
                            setIndex(1);
                        }}
                    >
                        Name A-Z
                    </div>
                    <div
                        className={cx('btn')}
                        onClick={() => {
                            setIndex(2);
                        }}
                    >
                        Name Z-A
                    </div>
                    <div
                        className={cx('btn')}
                        onClick={() => {
                            setIndex(3);
                        }}
                    >
                        Low to High Price
                    </div>
                    <div
                        className={cx('btn')}
                        onClick={() => {
                            setIndex(4);
                        }}
                    >
                        High to Low Price
                    </div>
                    <div className={cx('btn')}>Wooden Bird Cage</div>
                    <div className={cx('btn')}>Metal Bird Cage</div>
                </div>
                {/* list poducts */}
                {/* <ListTimeshares /> */}
                {index == 0 ? (
                    <ListTimeshares />
                ) : index == 1 ? (
                    <ListTimesharesAscByName />
                ) : index == 2 ? (
                    <ListTimesharesDescByName />
                ) : index == 3 ? (
                    <ListTimesharesAscByPrice />
                ) : (
                    <ListTimesharesDescByPrice />
                )}
                <div className={cx('pagination')}>
                    <div className={cx('num-btn', 'action')}>1</div>
                    <div className={cx('num-btn')}>2</div>
                    <div className={cx('num-btn')}>&gt;&gt;</div>
                </div>
            </div>
        </div>
    );
}

export default Timeshares;
