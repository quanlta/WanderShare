import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const Navbar = () => {
    return (
        <div className={cx('navbar')}>
            <div className={cx('wrapper')}>
                <div className={cx('user-items')}>
                    <div className={cx('user-item')}>
                        <FontAwesomeIcon icon={faBell} className={cx('icon')} />
                    </div>
                    <div className={cx('user-item')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
