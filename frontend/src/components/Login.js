import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://seu-backend.com/login', { // Altere para a URL do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();
            // Sucesso: você pode armazenar o token, redirecionar, etc.
            console.log('Login bem-sucedido:', data);
        } catch (error) {
            setError(error.message);
        }
    };

    // const GoToAdmin = (id) => {
    //     // Construct the edit page URL with the software ID
    //     const url = `/admindashboard`; // Replace with your actual edit route pattern
      
    //     // Use useNavigate hook for navigation
    //     navigate(url);
    //   };

    return (
        <div className="login-background">
            <div className="card p-4" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
                <div className="text-center mt-3">
                    <Link to="/registar">Criar Conta</Link><br/>
                    <Link to="/admindashboard">Admin</Link><br/>
                    <Link to="/compradordashboard">Comprador</Link><br/>
                    <Link to="/gestordashboard">Gestor</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
