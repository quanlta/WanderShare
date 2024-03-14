import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer__top')}>
                <div className={cx('phone')}>
                    <FontAwesomeIcon className={cx('phone-icon')} icon={faMobileScreenButton}></FontAwesomeIcon>
                    <span>Hotline: xxxx-xxx-xxx</span>
                </div>
                <div className={cx('email')}>
                    <FontAwesomeIcon className={cx('email-icon')} icon={faEnvelope}></FontAwesomeIcon>
                    <span>cskn@gmail.com</span>
                </div>
            </div>
            <div className={cx('footer__body')}>
                <div className={cx('col')}>
                    <h3 className={cx('title')}>Discover</h3>
                    <div className={cx('subtitle')}>
                        <h4>Crested bird cage</h4>
                        <h4>Warbler cage</h4>
                        <h4>Parrot bird cage</h4>
                    </div>
                </div>
                <div className={cx('col')}>
                    <h3 className={cx('title')}>Account</h3>
                    <div className={cx('subtitle')}>
                        <h4>Log in/Register</h4>
                        <h4>Purchase history</h4>
                        <h4>Address list</h4>
                    </div>
                </div>
                <div className={cx('col')}>
                    <h3 className={cx('title')}>Customer support</h3>
                    <div className={cx('subtitle')}>
                        <h4>Membership policy</h4>
                        <h4>Return policy</h4>
                        <h4>Warranty policy</h4>
                        <h4>Shopping guide</h4>
                        <h4>Product purchase suggestions</h4>
                        <h4>Frequently asked Questions</h4>
                    </div>
                </div>
                <div className={cx('col')}>
                    <h3 className={cx('title')}>Contact with us</h3>
                    <div className={cx('contact-icons')}>
                        <a href="#!">
                            <img src={images.facebook_logo} alt="facebook" />
                        </a>
                        <a href="#!">
                            <img src={images.instagram_logo} alt="instagram" />
                        </a>
                        <a href="#!">
                            <img src={images.github_logo} alt="github" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
