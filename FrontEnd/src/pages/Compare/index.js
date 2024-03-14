import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Compare.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);
function Compare() {
    let timeshareID = useParams();
    const [selectTimeshare, setSelectTimeshare] = useState([]);
    const [timeshares, setTimeshares] = useState([]);
    const handelCompare = (id) => {
        setSelectTimeshare((prefix) => [...prefix, id]);
    };
    useEffect(() => {
        if (!selectTimeshare.includes(timeshareID)) {
            setSelectTimeshare((prefix) => [...prefix, timeshareID.timeshareID]);
        }
        fetch('http://localhost:8080/api/v1/timeshare')
            .then((res) => res.json())
            .then((timeshare) => {
                setTimeshares(timeshare);
            });
    }, [timeshareID]);
    if (selectTimeshare.length < 3 && timeshares.length > 0) {
        // console.log('pro', timeshares);
        return (
            <div className={cx('thumb-wrapper')}>
                {timeshares.map((p, index) => {
                    return (
                        <div className={cx('thumb')} key={index} onClick={() => handelCompare(p.id)}>
                            <div className={cx('thumb-img')}>
                                <img src={p.timeshare_image}></img>
                            </div>
                            <h4 className={cx('title')}>{p.name}</h4>
                            <span className={cx('price')}>{p.price}$</span>
                        </div>
                    );
                })}
            </div>
        );
    }
    // console.log(selectTimeshare);
    // console.log('timeshares', timeshares);
    if (selectTimeshare.length >= 3 && timeshares.length > 0) {
        // console.log('select Pro', selectTimeshare);
        // console.log('p1', timeshares[selectTimeshare[1] - 1]);
        // console.log('p2', timeshares[selectTimeshare[2] - 1]);
        let p1 = timeshares[selectTimeshare[1] - 1];
        let p2 = timeshares[selectTimeshare[2] - 1];
        return (
            <div className={cx('container')}>
                <img src={images.timeshare_header} style={{ width: 100 + '%', height: 330 + 'px' }}></img>
                <div className={cx('title')}> Compare Timeshares</div>
                <div className={cx('content')}>
                    <div className={cx('top')}>
                        <div className={cx('left-top')}>
                            <div className={cx('name1')}>{p1.name}</div>
                            <div>
                                <img src={p1.timeshare_image}></img>
                            </div>
                        </div>
                        <div className={cx('divider')}>
                            <div></div>
                        </div>
                        <div className={cx('right-top')}>
                            <div className={cx('name2')}>{p2.name}</div>
                            <div>
                                <img src={p2.timeshare_image}></img>
                            </div>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('left-bottom')}>
                            <div className={cx('description')}>{p1.description}</div>
                        </div>
                        <div className={cx('center-bottom')}>
                            <div className={cx('description')}>Description</div>
                        </div>
                        <div className={cx('right-bottom')}>
                            <div className={cx('description')}>{p2.description}</div>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('left-bottom')}>
                            <div>{p1.price}$</div>
                        </div>
                        <div className={cx('center-bottom')}>
                            <div className={cx('text')}>Price</div>
                        </div>
                        <div className={cx('right-bottom')}>
                            <div>{p2.price}$</div>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('left-bottom')}>
                            <div>{p1.amount}</div>
                        </div>
                        <div className={cx('center-bottom')}>
                            <div className={cx('text')}>Amount</div>
                        </div>
                        <div className={cx('right-bottom')}>
                            <div>{p2.amount}</div>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('left-bottom')}>
                            <div>9 month</div>
                        </div>
                        <div className={cx('center-bottom')}>
                            <div className={cx('text')}>Guarantee</div>
                        </div>
                        <div className={cx('right-bottom')}>
                            <div>9 month</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Compare;
