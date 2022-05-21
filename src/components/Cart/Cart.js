import React from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
    const cartItems = (
        <ul className={styles["cart-items"]}>
            {[{ id: "c1", name: "Shushi", amount: "2", price: "12.99" }].map(
                (item) => (
                    <li key={item.id}>{item.name}</li>
                )
            )}
        </ul>
    );

    return (
        <Modal onClose={props.onCartClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>25.98</span>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles["button-alt"]}
                    onClick={props.onCartClose}
                >
                    Close
                </button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;
