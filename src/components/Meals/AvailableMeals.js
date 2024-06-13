import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsRef = ref(database, 'meals');
      onValue(mealsRef, (snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }
        const mealsData = snapshot.val();

        const loadedMeals = [];
        for (const key in mealsData) {
          loadedMeals.push({ id: key, ...mealsData[key] });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }, (error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    };

    fetchMeals();
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
