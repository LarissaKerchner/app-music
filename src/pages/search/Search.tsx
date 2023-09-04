import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import LoadingMessage from '../Loading';
import { AlbumType } from '../../types';
import './Search.css';

function Search() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artistName, setArtistName] = useState<string | null>(null);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setText(value);

    setSearch(value.length < 2);
  }

  async function handleSearchClick() {
    setLoading(true);
    const data = await searchAlbumsAPI(text);
    setAlbums(data);
    setLoading(false);
    setArtistName(text);
    setText('');
  }

  return (
    <div className="search-container">
      <form className="form-container">
        {loading ? (
          <LoadingMessage />
        ) : (
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              value={ text }
              placeholder="Quem você quer ouvir?"
              onChange={ handleSearchChange }
              className="input-search"
            />
            <button
              data-testid="search-artist-button"
              disabled={ search }
              onClick={ handleSearchClick }
              className="btn-search"
            >
              Pesquisar

            </button>
          </div>
        )}
      </form>
      {albums.length > 0 ? (
        <div className="list-music">
          <p>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={ album.collectionId }>
                <p>{album.collectionName}</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Ver Álbum
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>Nenhum álbum foi encontrado</h3>
      )}
    </div>
  );
}
export default Search;
