import { useState } from 'react';
import { SongType } from '../../types';
import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';
import { addSong } from '../../services/favoriteSongsAPI';

import './Algum.css';

function MusicCard({ trackId, trackName, previewUrl }:SongType) {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => {
    const addmusic = addSong;
    setFavorite(!isFavorite);
  };
  return (
    <div className="music-card">
      <div className="audio">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
      <div className="favorite">
        <label
          htmlFor={ `favorito-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <img
            src={ isFavorite ? checkedHeart : emptyHeart }
            alt="favorite"
          />
        </label>
        <input
          type="checkbox"
          className="hidden-checkbox"
          name={ `favorito-${trackId}` }
          id={ `favorito-${trackId}` }
          checked={ isFavorite }
          onChange={ () => toggleFavorite() }
        />
      </div>
    </div>
  );
} export default MusicCard;
