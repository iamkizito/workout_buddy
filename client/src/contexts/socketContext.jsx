import {useState, createContext, useEffect} from "react";
import io from "socket.io-client";

export const socketContext = createContext()


export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    
    useEffect(() => {
        const startSocket = async () => {
            try {
                const socket = io('ws://localhost:3000')
                socket.on('connect', () => {
                    console.log("websocket started")
                    setSocket(socket)
                })
            } catch (error) {
                console.log(error)
            }
        }
        startSocket()
    }, [])

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}