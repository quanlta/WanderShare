import { useContext } from 'react';
import './Cart.scss';
import { ShopContext } from '../../context/Shop-Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CartItem = (props) => {
    const { id, name, price, image } = props.data;
    const { cartItem, addToCart, removeFromCart, deleteFromCart, updateCartItemQuantity } = useContext(ShopContext);
    const cartItemInfo = cartItem.find((item) => item.id == id); // Tìm thông tin sản phẩm trong giỏ hàng
    const totalPriceTimeshare = () => {
        const itemInCart = cartItem.find((item) => item.id === id);

        if (itemInCart) {
            const timeshareQuantity = itemInCart.value; // Số lượng của sản phẩm trong giỏ hàng
            const total = timeshareQuantity * price; // Tổng tiền cho sản phẩm hiện tại
            return total;
        }

        return 0; // Trả về 0 nếu sản phẩm không tồn tại trong giỏ hàng
    };
    const totalForThisTimeshare = totalPriceTimeshare();

    return (
        <div className="cartItem">
            <div className="cart-info">
                <span className="Image">
                    <Link to={`/timeshare/${id}`}>
                        <img src={image} alt="" />
                    </Link>
                </span>
                <span className="Name">
                    <Link to={`/timeshare/${id}`} className="name">
                        <div>{name}</div>
                    </Link>
                    <div className="Delete">
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteFromCart(id)} className="trash" />
                    </div>
                </span>
                <span className="Price">{price}$</span>
                <span className="Quantity">
                    <div className="box-quantity">
                        <button onClick={() => removeFromCart(id)}>-</button>
                        <input
                            value={cartItemInfo ? cartItemInfo.value : 0}
                            onChange={(event) => updateCartItemQuantity(Number(event.target.value), id)}
                        />
                        <button onClick={() => addToCart(id)}>+</button>
                    </div>
                </span>
                <span className="Total">{totalForThisTimeshare}$</span>
            </div>
        </div>
    );
};
export default CartItem;
