import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import LoadingMessage from '../Loading';
import title from '../../images/Design_sem_nome-removebg-preview.png';
import './layout.css';

function Layout() {
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    getUser().then((user) => {
      setNameUser(user.name);
    });
  }, []);
  return (
    <div className="layout-container">
      <div className="header-container">
        <img src={ title } alt="title" className="title" style={ { width: '168px' } } />
        <header data-testid="header-component">
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favorito</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </nav>
        </header>
        <div className="layout-user">
          {nameUser ? (
            <p data-testid="header-user-name">{nameUser}</p>
          ) : (<LoadingMessage />)}
        </div>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>

  );
}
export default Layout;
