import classNames from 'classnames/bind';
import styles from './FeedBack.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function FeedBack() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('text')}>
                    <h2 className={cx('title')}>Users Feedback</h2>
                    <img src={images.hoa}></img>
                </div>
                <div className={cx('feedback')}>
                    <div className={cx('feedback-item')}>
                        <div className={cx('info')}>
                            <img className={cx('avata')} alt="avata" src={images.avata}></img>
                            <div className={cx('name')}>Harry</div>
                        </div>
                        <p className={cx('des')}>
                            I rent a timeshare from this website about a month ago and I am very satisfied with the
                            timeshare. 
                        </p>
                    </div>
                    <div className={cx('feedback-item')}>
                        <div className={cx('info')}>
                            <img className={cx('avata')} alt="avata" src={images.avata}></img>
                            <div className={cx('name')}>Davis</div>
                        </div>
                        <p className={cx('des')}>
                            I rent a timeshare from this website about a month ago and I am very satisfied with the
                            timeshare. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedBack;
