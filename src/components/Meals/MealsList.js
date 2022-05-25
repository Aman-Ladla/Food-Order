import React, { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealsList.module.css";

// const saveMeals = async () => {
//     DUMMY_MEALS.map(async (meal) => {
//         const response = await fetch(
//             "https://login-303e6-default-rtdb.firebaseio.com/meals.json",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(meal),
//             }
//         );
//         console.log(response.json());
//     });
// };

const MealsList = () => {
    const [meals, setMeals] = useState([]);

    const [httpError, setHttpError] = useState();

    const fetchMeals = useCallback(async () => {
        const response = await fetch(
            "https://login-303e6-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        let temp = [];

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                temp.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
        }

        setMeals([...temp]);
    }, []);

    useEffect(() => {
        fetchMeals().catch((error) => {
            setHttpError(error.message);
        });
    }, [fetchMeals]);

    const mealsList =
        meals.length === 0 ? (
            httpError ? (
                <p>{httpError}</p>
            ) : (
                <p>No meal found </p>
            )
        ) : (
            meals.map((meal) => (
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                ></MealItem>
            ))
        );

    return (
        <section className={styles.meals}>
            {/* <button type="button" onClick={saveMeals}>
                Save meals
            </button> */}
            <Card>{<ul>{mealsList}</ul>}</Card>
        </section>
    );
};

export default MealsList;
