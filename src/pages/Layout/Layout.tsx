import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import LoadingMessage from '../Loading';

function Layout() {
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    getUser().then((user) => {
      setNameUser(user.name);
    });
  }, []);
  return (
    <div>
      <header data-testid="header-component">
        <nav>
          <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">Favorito</NavLink>
          <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </nav>
        {nameUser ? (
          <p data-testid="header-user-name">{nameUser}</p>
        ) : (<LoadingMessage />)}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
