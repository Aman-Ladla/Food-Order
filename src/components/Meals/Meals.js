import React, { Fragment } from "react";
import MealsList from "./MealsList";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <MealsList></MealsList>
    </Fragment>
  );
};

export default Meals;
