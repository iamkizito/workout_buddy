import { Link, useNavigate } from 'react-router-dom';
import useUsersContext from '../hooks/useUsersContext';


const Header = () => {
    const {user, setUser} = useUsersContext()
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem('accessToken')
        setUser(null)
        navigate('/auth/signin')
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>  
                {user && 
                    <div className="profile">
                        <div className="email">{user.email}</div>
                        <button className="signout" onClick={signOut}>Sign Out</button>
                    </div>       
                }
            </div>
        </header>
    )
}


export default Header