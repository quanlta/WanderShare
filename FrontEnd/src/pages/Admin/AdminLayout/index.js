import Sidebar from '../NavSideBar/sidebar/Sidebar';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import Navbar from '../NavSideBar/navbar/Navbar';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('home')}>
            <Sidebar />
            <div className={cx('homeContainer')}>
                <Navbar />
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
