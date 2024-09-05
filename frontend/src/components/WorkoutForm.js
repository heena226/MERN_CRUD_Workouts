import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({workoutToEdit, onClose}) => {

    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        if (workoutToEdit) {
            setTitle(workoutToEdit.title);
            setLoad(workoutToEdit.load);
            setReps(workoutToEdit.reps);
        }

    }, [workoutToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let workout = {title, load, reps};

        const response = await fetch((workoutToEdit ? "/api/workouts/" + workoutToEdit._id : "/api/workouts"), {
            method: (workoutToEdit ? "PATCH" : "POST"),
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } 
        
        if(response.ok) {
            setError(null)
            setTitle('');
            setLoad('');
            setReps('');
            setEmptyFields([]);

            console.log(json, workout);

            if (workoutToEdit) {
                workout = {
                    title, 
                    load: load,
                    reps: reps,
                    _id: json._id,
                    createdAt: json.createdAt
                }
                console.log(workout);
                dispatch({type: 'UPDATE_WORKOUT', payload: workout})
                onClose();
            } else {
                dispatch({type: 'CREATE_WORKOUT', payload: json})
            }
            // console.log(workoutToEdit ? 'Workout modified' : 'New Workout added', json);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>
                {workoutToEdit ? "Edit Workout" : "Add a new Workout"}
            </h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in Kg):</label>
            <input
                type="number"
                min="2"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}                
            />

            <button>{workoutToEdit ? 'Edit Workout' : 'Add Workout'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;