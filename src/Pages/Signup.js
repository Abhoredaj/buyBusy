import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../Styles/signIn.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/;
    if (!passwordRegex.test(password)) {
      console.error("Password does not meet the requirements.");
      toast.error("Password must be 6-14 characters long and include at least one capital letter, one digit, and one special character.");
      return;
    }
    try {
      await signUp(name, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className={styles.container}>
                <div className={styles.inputForm}>
                    <h2 className="mb-3">Firebase Auth Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" 
                            placeholder="Name"  
                            required
                            onChange={(e) => setName(e.target.value)} />
                        <input type="email" 
                            placeholder="Email address"
                            required 
                            onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" 
                            placeholder="Enter Password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                        <button>Sign up</button>
                    </form>
                <div>
                  Already have an account? <Link to="/">Log In</Link>
                </div>
                </div>
                
            </div>
    </>
  );
};

export default Signup;