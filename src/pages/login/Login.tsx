import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import LoadingMessage from '../Loading';
import title from '../../images/Design_sem_nome-removebg-preview.png';
import './login.css';

function Login() {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);

    setDisabled(value.length < 3);
  }

  async function handleRedirection() {
    setLoading(true);

    try {
      await createUser({ name });
      navigate('/search');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <div className="body-login">
      <form className="login-form-container">
        <img src={ title } alt="title" className="title" />
        <div className="form-group">
          <input
            data-testid="login-name-input"
            className="input-login"
            name="name"
            value={ name }
            type="text"
            placeholder="Insira seu nome"
            onChange={ handleNameChange }
          />
          <button
            data-testid="login-submit-button"
            className="btn-login"
            disabled={ disabled }
            onClick={ handleRedirection }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
