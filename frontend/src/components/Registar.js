import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';  // Se precisar de estilos adicionais

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (!acceptTerms) {
            setError('Você deve aceitar os termos de serviço para continuar');
            return;
        }

        try {
            const response = await fetch('http://seu-backend.com/register', { // Altere para a URL do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    acceptTerms,
                    subscribeNewsletter
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar conta');
            }

            setSuccess('Conta criada com sucesso! Você pode fazer login agora.');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-background">
            <div className="card p-4" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">Criar Conta</h3>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="acceptTerms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="acceptTerms">
                            Aceito os termos de serviço
                        </label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <button type="submit" className="btn btn-primary w-100">Registrar</button>
                </form>
                <div className="text-center mt-3">
                    <Link to="/login">Já tem uma conta? Faça login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;