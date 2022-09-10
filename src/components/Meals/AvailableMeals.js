import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        'https://react-http-953ed-default-rtdb.firebaseio.com/meals.json'
      );

      if (!res.ok) return;

      const meals = await res.json();

      const loadedsMeals = [];

      Object.keys(meals).forEach((meal) => {
        loadedsMeals.push({ id: meal, ...meals[meal] });
      });

      console.log(loadedsMeals);
      setMeals(loadedsMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return <MealItem key={meal.id} {...meal} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
