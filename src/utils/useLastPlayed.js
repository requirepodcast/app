import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EpisodeProgressService from '../services/EpisodeProgressService';

export function useLastPlayed(cb) {
  const episodes = useSelector(store => store.episodes.episodes);

  useEffect(() => {
    if (episodes && episodes !== []) {
      EpisodeProgressService.lastPlayed.get().then(slug => {
        const episode = episodes.find(ep => ep.slug === slug);

        episode && cb(episode);
      });
    }
  }, [episodes]);
}
