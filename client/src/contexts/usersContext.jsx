import {useState, createContext, useEffect} from "react";

export const usersContext = createContext()


export const UsersContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    headers: {
                        "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    setUser(json.user)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [setUser])

    return (
        <usersContext.Provider value={{user, setUser}}>
            {children}
        </usersContext.Provider>
    )
}