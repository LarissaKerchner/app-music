import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import LoadingMessage from '../Loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from './MusicCard';
import './Algum.css';

function Album() {
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getMusics(id as string);
      if (data.length > 0) {
        setAlbumInfo(data[0] as AlbumType);
        setSongs(data.slice(1) as SongType[]);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) return <LoadingMessage />;

  return (
    <div className="album-list">
      {albumInfo && (
        <div className="artist-album">
          <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
          <h4 data-testid="album-name">{albumInfo.collectionName}</h4>
        </div>
      )}
      {songs.map((song) => (
        <MusicCard
          key={ song.trackId }
          trackId={ song.trackId }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
        />
      ))}
    </div>
  );
}
export default Album;
