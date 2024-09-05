import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({data, onEdit}) => {

    const {_id, load, reps, title} = data;

    const { dispatch } = useWorkoutsContext();

    const handleDeleteClick = async() => {
      const response = await fetch('/api/workouts/' + _id, {
        method: 'DELETE'
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json});
      }
    }

  return (
    <div className='workout-details' key = {_id}>
        <h4>{title}</h4>
        <p><strong>Load (kg): </strong>{load}</p>        
        <p><strong>Reps: </strong>{reps}</p>
        <p>{(data.createdAt)}</p>

        <span onClick={handleDeleteClick}>Delete</span>
        <span className='edit' onClick={onEdit}>Edit</span>
    </div>
  )
}

export default WorkoutDetails