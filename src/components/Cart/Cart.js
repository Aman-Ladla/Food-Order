import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const [isSubmitting, setIssubmitting] = useState(false);

    const [submitted, setSubmitted] = useState(false);

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

    const orderHandler = () => {
        setIsCheckingOut(true);
    };

    const submitOrderHandler = async (userData) => {
        setIssubmitting(true);
        await fetch(
            "https://login-303e6-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userData,
                    orderItems: cartCtx.items,
                }),
            }
        );
        setIssubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    };

    const modalContent = (
        <Fragment>
            <div className={styles["cart-upper-div"]}>
                {cartItems}
                <div className={styles.total}>
                    <span>Total amount</span>
                    <span>{totalAmount}</span>
                </div>
            </div>
            <hr />
            {isCheckingOut && (
                <Checkout
                    onPlaceOrder={submitOrderHandler}
                    onCancel={props.onCartClose}
                />
            )}
            {!isCheckingOut && (
                <div className={styles.actions}>
                    <button
                        className={styles["button-alt"]}
                        onClick={props.onCartClose}
                    >
                        Close
                    </button>
                    {cartHasItems && (
                        <button
                            className={styles.button}
                            onClick={orderHandler}
                        >
                            Order
                        </button>
                    )}
                </div>
            )}
        </Fragment>
    );

    const submittingContent = <p>Sending your request...</p>;

    const submittedContent = (
        <Fragment>
            <p>Your order is submitted</p>
            <div className={styles.actions}>
                <button
                    className={styles["button-alt"]}
                    onClick={props.onCartClose}
                >
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onCartClose}>
            {!isSubmitting && !submitted && modalContent}
            {isSubmitting && !submitted && submittingContent}
            {!isSubmitting && submitted && submittedContent}
        </Modal>
    );
};

export default Cart;
