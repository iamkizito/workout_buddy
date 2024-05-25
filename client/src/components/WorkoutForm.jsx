import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router-dom";

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useWorkoutsContext()
    const navigate = useNavigate()

    const resetForm = () => {
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/workouts', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({title, reps, load})
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({type:"ADD_WORKOUT", payload:json.workout})
                resetForm()
            } else if (response.status === 401) {
                navigate("/auth/signin")
            } else {
                throw Error(json.error)
            }
            
        }catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <h3>Add a new Workout</h3>
            <div className="form_item">               
                <label htmlFor="title">Exercise Title:</label>
                <input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="form_item">
                <label htmlFor="load">Load (in kg):</label>
                <input type="number" name="load" required value={load} onChange={(e) => setLoad(e.target.value)}/>
            </div>

            <div className="form_item">
                <label htmlFor="reps">Reps:</label>
                <input type="number" name="reps" required value={reps} onChange={(e) => setReps(e.target.value)}/>
            </div>


            <button type="submit" disabled={loading}>ADD</button>

            {error && <div>{error}</div>}
            
        </form>
    )
}


export default WorkoutForm