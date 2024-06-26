import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Search from './pages/search/Search';
import Album from './pages/album/Album';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        {/* <Route path="/favorites" element={ <Favorites /> } /> */}
        {/* <Route path="/profile" element={ <Profile /> } /> */}
        {/* <Route path="/profile/edit" element={ <ProfileEdit /> } /> */}
      </Route>
      {/* <Route path="/*" element={ <NotFound /> } /> */}
    </Routes>
  );
}

export default App;
