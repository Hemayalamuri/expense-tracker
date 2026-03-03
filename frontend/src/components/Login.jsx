import { useState } from 'react';

export default function Login({ onLogin, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const login = async () => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailError("");
        setPasswordError("");
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
            credentials: "include"
        });
        if (res.ok) {
            await onLogin();
        } else {
            setPasswordError("Please check your credentials and try again.");
        }
    };

    return (
        <div style={{
            maxWidth: 350,
            margin: '3rem auto',
            padding: '2rem',
            background: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#2b6cb0', marginBottom: '1.5rem' }}>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                style={{
                    width: '85%',
                    padding: '0.6rem',
                    marginBottom: emailError ? '0.1rem' : '1rem',
                    borderRadius: '5px',
                    border: '1px solid #cbd5e0',
                    fontSize: '1rem'
                }}
            />
            {emailError && <div style={{ display: 'flex', alignItems: 'center', color: 'red', fontSize: '0.9rem', marginBottom: '0.7rem', textAlign: 'left', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                <span style={{ fontWeight: 'bold', marginRight: '0.4em', fontSize: '0.8em' }}>&#9432;</span>{emailError}
            </div>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                    width: '85%',
                    padding: '0.6rem',
                    marginBottom: passwordError ? '0.1rem' : '2rem',
                    borderRadius: '5px',
                    border: '1px solid #cbd5e0',
                    fontSize: '1rem'
                }}
            />
            {passwordError && <div style={{ display: 'flex', alignItems: 'center', color: 'red', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'left', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                <span style={{ fontWeight: 'bold', marginRight: '0.4em', fontSize: '0.8em' }}>&#9432;</span>{passwordError}
            </div>}
            <button
                onClick={login}
                style={{
                    width: '50%',
                    alignContent: 'center',
                    padding: '0.7rem',
                    background: '#3182ce',
                    color: '#fff',
                    border: '1px solid white',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                }}
            >
                Login
            </button>
            <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>
                Don't have an account?{' '}
                <button
                    onClick={() => onSwitch("register")}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#3182ce',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: 0
                    }}
                >
                    Register
                </button>
            </p>
        </div>
    );
}