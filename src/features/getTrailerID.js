// features/getTrailerID.js
export const getTrailerID = (videos) => {
  if (!videos || !Array.isArray(videos)) return null;

  const trailer = videos.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer ? trailer.key : null;
};
 