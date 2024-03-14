import { useState, useEffect } from 'react';
import { createContext } from 'react';
export const ShopContext = createContext(null);
// lay san pham o trang thai mac dinh
let listTimeshares = [];
const List = () => {
    const [timeshares, setTimeshares] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/timeshare')
            .then((res) => res.json())
            .then((timeshare) => {
                setTimeshares(timeshare);
            });
    }, []);
    if (timeshares.length > 0) {
        listTimeshares = timeshares;
        return listTimeshares;
    }
    return listTimeshares;
};
var Listlenght = 0;
const getDefaultCart = () => {
    Listlenght = List().length;
    let cart = [];

    for (let i = 1; i <= Listlenght; i++) {
        cart.push({ id: i, value: 0 });
    }
    return cart;
};

// lay du lieu ra và đẩy ra
const DefaultCart = () => {
    const cartItem = localStorage.getItem('shopCart');
    return cartItem ? JSON.parse(cartItem) : getDefaultCart;
};

export const ShopContextProvider = (props) => {
    const [cartItem, setcartItem] = useState(DefaultCart());
    // set local len server
    useEffect(() => {
        localStorage.setItem('shopCart', JSON.stringify(cartItem));
    }, [cartItem]);
    const addToCart = (timeshareID) => {
        setcartItem((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === timeshareID) {
                    return { ...item, value: item.value + 1 };
                }
                return item;
            });

            // Nếu sản phẩm không tồn tại trong giỏ hàng, thêm mới
            if (!updatedCart.some((item) => item.id === timeshareID)) {
                updatedCart.push({ id: timeshareID, value: 1 });
            }

            return updatedCart;
        });
    };
    const removeFromCart = (timeshareID) => {
        setcartItem((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === timeshareID) {
                    return { ...item, value: item.value - 1 };
                }
                return item;
            });

            // Loại bỏ sản phẩm khỏi giỏ hàng nếu số lượng là 0 hoặc dưới 0
            return updatedCart.filter((item) => item.value > 0);
        });
    };
    // hàm xóa luôn sản phẩm ra giỏ
    const deleteFromCart = (timeshareID) => {
        setcartItem((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== timeshareID); // Sử dụng filter để loại bỏ sản phẩm với timeshareID khỏi giỏ hàng

            if (updatedCart.length === prevCart.length) {
                console.log(`Sản phẩm với ID ${timeshareID} không có trong giỏ.`);
            }

            return updatedCart;
        });
    };
    // cập nhật số lượng sản phẩm
    const updateCartItemQuantity = (newQuantity, timeshareID) => {
        setcartItem((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === timeshareID) {
                    return { ...item, value: newQuantity };
                }
                return item;
            });

            return updatedCart;
        });
    };
    // tính tổng
    const calculateTotalPrice = (cartItem, timeshares) => {
        let total = 0;

        // Lặp qua tất cả sản phẩm trong giỏ hàng
        for (const item of cartItem) {
            const timeshare = timeshares.find((p) => p.id === item.id);

            if (timeshare) {
                // Tính tổng tiền cho sản phẩm và cộng vào tổng số tiền
                total += timeshare.price * item.value;
            }
        }

        return total;
    };
    //  Tính tổng số lượng tất cả sản phẩm có trong giỏ
    const calculateTotalQuantity = (cartItem) => {
        let totalQuantity = 0;

        // Lặp qua tất cả sản phẩm trong giỏ hàng
        for (const item of cartItem) {
            totalQuantity += item.value;
        }

        return totalQuantity;
    };

    const contextValue = {
        cartItem,
        addToCart,
        removeFromCart,
        deleteFromCart,
        updateCartItemQuantity,
        calculateTotalPrice,
        calculateTotalQuantity,
    };
    // console.log('cart', getDefaultCart());
    console.log('cart', cartItem);
    return <ShopContext.Provider value={contextValue}> {props.children}</ShopContext.Provider>;
};
