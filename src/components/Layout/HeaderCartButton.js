import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const [btnInAnim, setBtnInAnim] = useState(false);

    const { items } = cartCtx;

    const btnClasses = `${styles.button} ${btnInAnim && styles.bump}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setBtnInAnim(true);
        const timer = setTimeout(() => {
            setBtnInAnim(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const cartOpenHandler = () => {
        props.onCartOpen();
    };

    return (
        <button className={btnClasses} onClick={cartOpenHandler}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
