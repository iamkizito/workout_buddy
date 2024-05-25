import { useState, useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import WorkoutForm from "../components/WorkoutForm";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const {workouts, loading, error, isAuthenticated} = useHome()

    return (
        <div className="home">
            {isAuthenticated && 
                <>
                    <div className="workout_routines">  
                        {loading && <h3>getting data...</h3>}              
                        {error && <h3>Error while getting data</h3>}              
                        {workouts && workouts.map((workout) => {
                            return <WorkoutDetail key={workout._id} workout={workout}/>
                        })}
                    </div>
                    <div className="workout_form">
                        <WorkoutForm />
                    </div>
                </>
            }
        </div>
    )
}

export default Home



const useHome = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const {workouts, dispatch} = useWorkoutsContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getWorkouts = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:3000/api/workouts', {
                    headers: {
                        "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch({type:"SET_WORKOUTS", payload:json.workouts})
                    setIsAuthenticated(true)
                } else if (response.status === 401) {
                    navigate("/auth/signin")
                }
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }

        getWorkouts()
    }, [dispatch, navigate])

    return {workouts, dispatch, loading, error, isAuthenticated}
}