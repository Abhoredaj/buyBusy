import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import styles from "../Styles/signIn.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
        <div className={styles.container}>
            
          <div className={styles.inputForm}>
            <h2 className="mb-3">Firebase Auth Login</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" 
                        placeholder="Email address"
                        required
                        onChange={(e) => setEmail(e.target.value)} />

                    <br />
              <input type="password" 
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                    <br />
              <button>Log In</button>
            </form>

            <div>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
            
        </div>
    </>
  );
};

export default Login;