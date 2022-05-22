import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const cartHasItems = cartCtx.items.length > 0;

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                ></CartItem>
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onCartClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles["button-alt"]}
                    onClick={props.onCartClose}
                >
                    Close
                </button>
                {cartHasItems && (
                    <button className={styles.button}>Order</button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;
