import classNames from 'classnames/bind';
import styles from './ListTimesharesDescByName.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
let listTimeshares = [];
function ListTimesharesDescByName() {
    const [timeshares, setTimeshares] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/timeshare/getAllOrderByNameDesc')
            .then((res) => res.json())
            .then((timeshare) => {
                setTimeshares(timeshare);
            });
    }, []);
    if (timeshares.length > 0) {
        listTimeshares = timeshares;
    }
    return (
        <div className={cx('thumb-wrapper')}>
            {listTimeshares.length > 0 &&
                listTimeshares.map((p, index) => {
                    return (
                        <Link to={`/timeshare/${p.id}`} className={cx('thumb')} key={index}>
                            <div className={cx('thumb-img')}>
                                <img src={p.timeshare_image}></img>
                            </div>
                            <h4 className={cx('title')}>{p.name}</h4>
                            <span className={cx('price')}>{p.price}$</span>
                        </Link>
                    );
                })}
        </div>
    );
}

export default ListTimesharesDescByName;
