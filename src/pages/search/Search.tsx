import { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import LoadingMessage from '../Loaging';
import { AlbumType } from '../../types';

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
    <>
      <form>
        {loading ? (
          <LoadingMessage />
        ) : (
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              value={ text }
              onChange={ handleSearchChange }
            />
            <button
              data-testid="search-artist-button"
              disabled={ search }
              onClick={ handleSearchClick }
            >
              Pesquisar

            </button>
          </div>
        )}
      </form>
      {albums.length > 0 ? (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={ album.collectionId }>
                <p>{album.collectionName}</p>
                <a
                  href={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Ver Álbum
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>Nenhum álbum foi encontrado</h3>
      )}
    </>
  );
}
export default Search;
