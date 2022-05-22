import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const amountRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const inputAmount = amountRef.current.value;
        const inputAmountNumber = +inputAmount;

        if (
            inputAmount.trim().length === 0 ||
            inputAmountNumber < 1 ||
            inputAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(inputAmountNumber);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={amountRef}
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            ></Input>
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;
