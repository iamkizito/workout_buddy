import { workoutsContext } from "../contexts/workoutsContext";
import { useContext } from "react";


const useWorkoutsContext = () => {
    const context = useContext(workoutsContext)

    if (!context) {
        throw Error('useWorkoutContext must be used inside a workoutContextProvider')
    }
    return context
}

export default useWorkoutsContext