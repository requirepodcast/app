export function getEpisode(queuePosition, episodes) {
  return queuePosition
    ? episodes[queuePosition]
    : queuePosition === 0 && episodes[queuePosition];
}
