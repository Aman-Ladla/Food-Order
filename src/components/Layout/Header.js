import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h2>Food Order</h2>
                <HeaderCartButton onCartOpen={props.onCartOpen} />
            </header>
            <div className={styles["main-image"]}>
                <img src={mealsImage} alt="Table full of delicious food!" />
            </div>
        </Fragment>
    );
};

export default Header;
