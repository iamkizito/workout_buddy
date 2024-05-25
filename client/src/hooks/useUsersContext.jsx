import { usersContext } from "../contexts/usersContext";
import { useContext } from "react";


const useUsersContext = () => {
    const context = useContext(usersContext)

    if (!context) {
        throw Error('useUsersContext must be used inside a userContextProvider')
    }
    return context
}

export default useUsersContext