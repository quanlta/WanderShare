import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import images from '../../../assets/images';
import logo from '../../../assets/images/logo.png';
import { useContext } from 'react';
import { ShopContext } from '../../../context/Shop-Context';
import { List } from '../../../pages/Cart/List';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header() {
    const { cartItem, calculateTotalQuantity } = useContext(ShopContext);
    const totalQuantityInCart = calculateTotalQuantity(cartItem);
    const token = localStorage.getItem('access_token');
    return (
        <header className={cx('header')}>
            {/* <!-- navbar --> */}
            <nav className={cx('header__navbar')}>
                {/* <!-- logo --> */}
                <img src={logo} alt="logo" className={cx('logo')} />
                {/* <!-- subnav --> */}
                <div className={cx('subnav')}>
                    <Link to={'/'} className={cx('link')}>
                        HOME
                    </Link>
                    <Link to={'/timeshares'} className={cx('link')}>
                        TIMESHARES
                    </Link>
                </div>
                {/* <!-- search --> */}
                {/* <div className={cx('search')}>
                    <input type="text" placeholder="Type to search ..." className={cx('subsearch')} />
                    <a href="#!" className={cx('search-logo')}>
                        <img src={images.search_logo} alt="search-logo" />
                    </a>
                </div> */}
                <Search />
                {/* <!-- login --> */}
                <div className={cx('login')}>
                    {token ? (
                        <>
                            <div></div>
                            <div className={cx('user')}>
                                <FontAwesomeIcon icon={faUser} className={cx('user-icon')}></FontAwesomeIcon>
                                <div className={cx('user-choose')}>
                                    <Link to={'/info'} className={cx('info')}>
                                        Information
                                    </Link>
                                    <Link
                                        to={'/login'}
                                        className={cx('log-out')}
                                        onClick={() => {
                                            localStorage.removeItem('access_token');
                                            localStorage.removeItem('refresh_token');
                                            localStorage.removeItem('username');
                                        }}
                                    >
                                        Log out
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link className={cx('sign-in')} to={'/login'}>
                                <Link to={'/login'}>Sign in</Link>
                                <Link to={'/login'} className={cx('sign-in-logo')}>
                                    <FontAwesomeIcon
                                        icon={faRightToBracket}
                                        className={cx('sign-in-icon')}
                                    ></FontAwesomeIcon>
                                </Link>
                            </Link>
                            <Link className={cx('sign-up')} to={'/register'}>
                                <a href="#!">Sign up</a>
                                <a href="#!" className={cx('sign-up-logo')}>
                                    <FontAwesomeIcon icon={faUserPlus} className={cx('sign-up-icon')}></FontAwesomeIcon>
                                </a>
                            </Link>
                        </>
                    )}
                    {/* // Cart */}
                    <Link to="/Cart" className={cx('buy-logo')}>
                        <FontAwesomeIcon icon={faCartShopping} className={cx('buy-icon')}></FontAwesomeIcon>
                        {totalQuantityInCart > 0 && <div className={cx('total-quantity')}>{totalQuantityInCart}</div>}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
