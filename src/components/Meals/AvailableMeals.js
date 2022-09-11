import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        'https://react-http-953ed-default-rtdb.firebaseio.com/meals.json'
      );

      if (!res.ok) throw new Error('Something went wrong!');

      const meals = await res.json();

      const loadedsMeals = [];

      Object.keys(meals).forEach((meal) => {
        loadedsMeals.push({ id: meal, ...meals[meal] });
      });

      setMeals(loadedsMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

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
