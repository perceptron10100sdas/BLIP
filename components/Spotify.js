import React from 'react';

const SpotifyPlaylist = () => {
  const iframeStyle = {
    borderRadius: '12px',
  };

  return (
    <iframe
    className='rounded-md shadow-lg shadow-green-500'
      style={iframeStyle}
      src="https://open.spotify.com/embed/playlist/5ABHKGoOzxkaa28ttQV9sE?utm_source=generator&theme=0"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default SpotifyPlaylist;

