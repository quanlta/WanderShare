import classNames from 'classnames/bind';
import styles from './FeedBack.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function FeedBack() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('text')}>
                    <h2 className={cx('title')}>Customer Feedback</h2>
                    <img src={images.hoa}></img>
                </div>
                <div className={cx('feedback')}>
                    <div className={cx('feedback-item')}>
                        <div className={cx('info')}>
                            <img className={cx('avata')} alt="avata" src={images.avata}></img>
                            <div className={cx('name')}>Duy Khoa</div>
                        </div>
                        <p className={cx('des')}>
                            I bought a bird cage from this store about a month ago and I am very satisfied with the
                            timeshare. The bird cage is very sturdy and made of high-quality materials, making it durable
                            and reliable.
                        </p>
                    </div>
                    <div className={cx('feedback-item')}>
                        <div className={cx('info')}>
                            <img className={cx('avata')} alt="avata" src={images.avata}></img>
                            <div className={cx('name')}>Nguyen Cong</div>
                        </div>
                        <p className={cx('des')}>
                            I really appreciate the customer care from this store. They answered all my questions
                            quickly and friendly. I feel confident buying timeshares from them.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedBack;
