import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function useOrder() {
    return useContext(OrderContext);
}

export function OrderProvider({ children }) {
    const [ordersucess, setOrderSucess] = useState({
        shippingInfo: {
            name: '',
            phone: '',
            email: '',
            paymentMethod: '',
        },
    });

    return <OrderContext.Provider value={{ ordersucess, setOrderSucess }}>{children}</OrderContext.Provider>;
}
