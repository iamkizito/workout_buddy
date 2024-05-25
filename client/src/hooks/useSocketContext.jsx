import { socketContext } from "../contexts/socketContext";
import { useContext } from "react";


const useSocketContext = () => {
    const context = useContext(socketContext)

    if (!context) {
        throw Error('useSocketContext must be used inside a SocketContextProvider')
    }
    return context
}

export default useSocketContext