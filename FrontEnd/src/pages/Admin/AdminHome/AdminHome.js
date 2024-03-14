import Sidebar from '../NavSideBar/sidebar/Sidebar';
import styles from './AdminHome.module.scss';
import classNames from 'classnames/bind';
import './AdminHome.module.scss';
import Navbar from '../NavSideBar/navbar/Navbar';
import Widget from '../Widget/Widget';
import Chart from './Chart/Chart';
import Circle from './Circle/Circle';
import AdminLayout from '../AdminLayout/';
const cx = classNames.bind(styles);

const AdminHome = () => {
    return (
        <AdminLayout>
            <div className={cx('home')}>
                <div className={cx('widgets')}>
                    <Widget />
                    {/* <Widget />
                    <Widget />
                    <Widget /> */}
                </div>
                <div className={cx('charts')}>
                    <Chart />
                    <Circle />
                </div>
            </div>
        </AdminLayout>
    );
};
export default AdminHome;
