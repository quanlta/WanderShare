import { ShopContext } from '../../context/Shop-Context';
import { List } from './List';
import { useContext } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import images from '../../assets/images';

export const ShoppingCart = () => {
    const timeshareArray = List();
    const { cartItem, calculateTotalPrice, calculateTotalQuantity } = useContext(ShopContext);
    const total = calculateTotalPrice(cartItem, List());
    const totalQuantityInCart = calculateTotalQuantity(cartItem, timeshareArray);
    // console.log('cartItem', cartItem);
    // console.log('total', total);

    // Kiểm tra xem có sản phẩm trong giỏ hàng hay không
    const hasItemsInCart = Object.keys(cartItem).length > 0;

    return (
        <div className="cart">
            <div>
                <img className="image-head" src={images.timeshare_header} alt="" />
                <div className="title">
                    <h1>Shopping Cart </h1>
                    <img src={images.hoa} alt="" />
                </div>
            </div>
            <div className="cart-page">
                {hasItemsInCart && (
                    <div className="cart-header">
                        <div className="info">Timeshare information </div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                    </div>
                )}
            </div>
            <div className="cartItems">
                {hasItemsInCart ? (
                    // Hiển thị danh sách sản phẩm nếu có sản phẩm trong giỏ hàng
                    timeshareArray.map((timeshare) => {
                        if (cartItem.some((item) => item.id === timeshare.id)) {
                            return <CartItem data={timeshare} />;
                        }
                    })
                ) : (
                    // Hiển thị "Giỏ hàng rỗng" nếu không có sản phẩm trong giỏ hàng
                    <div className="empty-cart">
                        <img
                            src="https://theme.hstatic.net/200000551679/1001042568/14/cart_empty_background.png?v=874"
                            alt="empty cart"
                        />
                        <h1>This Cart is Empty</h1>
                        <h2>Go to the store page to choose to buy timeshares!!</h2>
                        <Link to={'/timeshares'}>
                            <button className="btn-shop">Shopping now</button>
                        </Link>
                    </div>
                )}
            </div>

            {hasItemsInCart && (
                <div className="SubTotal">
                    <span className="text">SubTotal :</span>
                    <span className="value">{total}$</span>
                </div>
            )}
            <Link to="/Order">{hasItemsInCart && <button className="btn-checkout"> Check out</button>}</Link>
        </div>
    );
};
