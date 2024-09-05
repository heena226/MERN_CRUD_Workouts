import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {

    // const [workouts, setWorkouts] = useState(null);
    const [error, setError] = useState(null);

    const {workouts, dispatch} = useWorkoutsContext();

    const [workoutToEdit, setWorkoutToEdit] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts');
                
                const json = await response.json();
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                if (response.ok) {
                    dispatch({type: 'SET_WORKOUTS', payload: json})
                }

            } catch (err) {
                setError('Failed to fetch workouts. Please try again later.');
                console.error('Fetch error:', err);
            }
        }
        fetchWorkouts();
    }, [dispatch]);

  return (
    <div className='home'>
        <div className='workouts'>
            {error && <p>{error}</p>}
            {workouts && workouts.map((workout) => (
                <WorkoutDetails 
                    key={workout._id} 
                    data={workout}
                    onEdit={() => setWorkoutToEdit(workout)} />
            ))}
        </div>
        <div>
            <WorkoutForm 
                workoutToEdit={workoutToEdit} 
                onClose={() => setWorkoutToEdit(null)}    
            />
        </div>
    </div>
  )
}

export default Home