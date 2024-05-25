import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setError(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({email, password})
            })

            const json = await response.json()
            
            if (response.ok) {
                localStorage.setItem("accessToken", json.token)
                navigate("/auth/signin")
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
            <h3>Create an Account</h3>
            <div className="form_item">               
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form_item">
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="already">
                <span>Already have an account? </span>
                <Link to="/auth/signin">sign in</Link>
            </div>

            <button type="submit" disabled={loading}>Register</button>
        </form>
    )
}


export default SignUpForm