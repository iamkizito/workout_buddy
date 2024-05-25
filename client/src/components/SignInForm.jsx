import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useUsersContext from "../hooks/useUsersContext";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const {setUser} = useUsersContext()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setError(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/users/signin', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({email, password})
            })

            const json = await response.json()
            
            if (response.ok) {
                localStorage.setItem("accessToken", json.token)
                setUser(json.user)
                navigate("/")
                resetForm()
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
            {error && <div>{error}</div>}
            <h3>Sign In</h3>
            <div className="form_item">               
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form_item">
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="already">
                <span>Don't have an account? </span>
                <Link to="/auth/signup">sign up</Link>
            </div>

            <button type="submit" disabled={loading}>Sign in</button>            
        </form>
    )
}


export default SignInForm