import requireLogo from '../images/RequireLogo.png';

export function episodesToQueue(episodes) {
  const queue = [];
  for (let episode of episodes) {
    queue.push({
      id: episode.id,
      url: episode.audioUrl,
      title: episode.title,
      artist: 'Require Podcast',
      artwork: requireLogo,
    });
  }
}
