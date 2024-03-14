import Home from '../pages/Home';
import Timeshares from '../pages/Timeshares';
import TimeshareDetail from '../pages/TimeshareDetail';
import Compare from '../pages/Compare';
import { ShoppingCart } from '../pages/Cart/ShoppingCart';
import LoginPage from '../pages/LoginAccount';
import RegisterPage from '../pages/RegisterAccount';
import ForgotPassword from '../pages/ForgotPassword';
import DefaultLayout from '../components/layout/DefaultLayout';
import UserInfo from '../pages/UserInfo';
import AdminHome from '../pages/Admin/AdminHome/AdminHome';
import { Order } from '../pages/Order/Order';
import OrderSucess from '../pages/Order/OrderSucess/OrderSucess';
import AdminOrder from '../pages/Admin/Order/Order';
import ModalSuccess from '../pages/ModalSuccess';
import TimesharesList from '../pages/Admin/TimesharesList/TimesharesList';
import CustomerList from '../pages/Admin/CustomerList/CustomerList';
import { Comment } from '../pages/Admin/Comment/Comment';
const role = localStorage.getItem('role');
const publicRoute = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/timeshares', component: Timeshares, layout: DefaultLayout },
    { path: '/timeshare/:timeshareID', component: TimeshareDetail, layout: DefaultLayout },
    { path: '/compare/:timeshareID', component: Compare, layout: DefaultLayout },
    { path: '/Cart', component: ShoppingCart, layout: DefaultLayout },
    { path: '/info', component: UserInfo, layout: UserInfo },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/register', component: RegisterPage, layout: null },
    { path: '/forgot', component: ForgotPassword, layout: null },
    { path: '/order', component: Order, layout: null },
    { path: '/ordersucess', component: OrderSucess, layout: null },
    { path: '/success', component: ModalSuccess, layout: null },
];
if (role == 'ADMIN') {
    publicRoute.push({ path: '/admin', component: AdminHome, layout: null });
    publicRoute.push({ path: '/adminorder', component: AdminOrder, layout: null });
    publicRoute.push({ path: '/admin/timeshares', component: TimesharesList, layout: null });
    publicRoute.push({ path: '/admin/customer', component: CustomerList, layout: null });
    publicRoute.push({ path: '/admin/comment', component: Comment, layout: null });
}
const privateRoute = [];
export { publicRoute, privateRoute };
