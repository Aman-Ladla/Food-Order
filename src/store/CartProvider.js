import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        let updateItems;

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });

        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem) {
            const updatedCartItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };

            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updatedCartItem;
        } else {
            updateItems = state.items.concat(action.item);
        }
        const updatedTotalAmount =
            state.totalAmount + action.item.amount * action.item.price;
        return {
            items: updateItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });

        const existingCartItem = state.items[existingCartItemIndex];
        let updateItems;

        if (existingCartItem.amount === 1) {
            updateItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updatedItem;
        }

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        return {
            items: updateItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "CLEAR") {
        return defaultCart;
    }

    return defaultCart;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCart);

    const addItemToCartHandler = (item) => {
        dispatchCartState({
            type: "ADD",
            item: item,
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartState({
            type: "REMOVE",
            id: id,
        });
    };

    const clearCartHandler = () => {
        dispatchCartState({
            type: "CLEAR",
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
