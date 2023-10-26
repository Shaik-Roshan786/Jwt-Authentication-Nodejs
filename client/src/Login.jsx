import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;   
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(res => {
                if (res.data.Status === "Success") {
                    if (res.data.role === "admin") {
                        navigate('/dashboard');
                    } else {
                        navigate('/');
                    }
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 vw-100">
            <div className="bg-white p-3 rounded w-100">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email" 
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password" 
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default w-100 rounded-0">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;





















// import  { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import {Link, useNavigate} from 'react-router-dom'

// function Login() {
 
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     axios.defaults.withCredentials = true;
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3001/login', {email, password})
//         .then(res => {
//             if(res.data.Staus === "Success") {
//                 if(res.data.role === "admin") {
//                     navigate('/dashboard')
//                 } else {
//                     navigate('/')
//                 }
//             }
//         }).catch(err => console.log(err))
//     }

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 vw-100">
//             <div className="bg-white p-3 rounded w-100">
//                 <h2 className="mb-4">Login</h2>
//                 <form onSubmit={handleSubmit}>
          
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="form-control rounded-0"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             name="password"
//                             className="form-control rounded-0"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
//                     </form>
//                     <p>Already Have an Account</p>
//                     <Link to="/register" type="submit" className="btn btn-default w-100 rounded-0">Sign Up</Link>

             
//             </div>
//         </div>
//     )
// }

// export default Login;