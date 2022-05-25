import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const [formValid, setFormValid] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        const isEmpty = (input) => input.trim().length === 0;

        const is6Digits = (input) => input.trim().length === 6;

        const inputName = nameRef.current.value;
        const inputStreet = streetRef.current.value;
        const inputPostalCode = postalCodeRef.current.value;
        const inputCity = cityRef.current.value;

        const nameIsValid = !isEmpty(inputName);
        const streetIsValid = !isEmpty(inputStreet);
        const cityIsValid = !isEmpty(inputCity);
        const postalCodeIsValid = is6Digits(inputPostalCode);

        setFormValid({
            name: nameIsValid,
            city: cityIsValid,
            postalCode: postalCodeIsValid,
            street: streetIsValid,
        });

        const formIsValid =
            nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onPlaceOrder({
            name: inputName,
            city: inputCity,
            postalCode: inputPostalCode,
            street: inputStreet,
        });
    };

    const getClasses = (input) => {
        return `${styles.control} ${!input && styles.invalid}`;
    };

    return (
        <form onSubmit={confirmHandler} className={styles.form}>
            <div className={getClasses(formValid.name)}>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" ref={nameRef} />
                {!formValid.name && <p>Please enter valid name</p>}
            </div>
            <div className={getClasses(formValid.street)}>
                <label htmlFor="street">Steet</label>
                <input type="text" id="street" ref={streetRef} />
                {!formValid.street && <p>Please enter valid street</p>}
            </div>
            <div className={getClasses(formValid.postalCode)}>
                <label htmlFor="postal-code">Postal Code</label>
                <input type="text" id="postal-code" ref={postalCodeRef} />
                {!formValid.postalCode && (
                    <p>Please enter valid postal code of 6 digits</p>
                )}
            </div>
            <div className={getClasses(formValid.city)}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef} />
                {!formValid.city && <p>Please enter valid city</p>}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
