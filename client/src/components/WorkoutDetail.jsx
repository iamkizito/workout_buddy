import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom";


const WorkoutDetail = ({workout}) => {
    const {dispatch} = useWorkoutsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const deleteWorkout = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/workouts/${workout._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type:"DELETE_WORKOUT", payload:workout._id})
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
        <div className="workout_detail" key={workout._id}>
            {error && <div className="delete_error_notice">failed to delete</div>}
            <div className="container">
                <div className="left">
                    <div className="detail title">{workout.title[0].toUpperCase() + workout.title.slice(1).toLowerCase()}</div>
                    <div className="detail reps"><span className="name">Reps: </span><span className="value">{workout.reps}</span></div>
                    <div className="detail load"><span className="name">Load (kg): </span><span className="value">{workout.load}</span></div>
                    <div className="detail time">{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</div>
                </div>

                <div className="right">
                    <button 
                        className="delete material-symbols-outlined" 
                        onClick={() => deleteWorkout(workout._id)} 
                        disabled={loading} 
                    >
                        delete
                    </button>
                </div>
            </div>
            

        </div>
    )
}

export default WorkoutDetail