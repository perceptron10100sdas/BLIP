import React from 'react';

function SpotifyPlaylist() {
  const iframeStyle = {
    borderRadius: '12px',
  };

  return (
    <div>
      <iframe
        title="Spotify Playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbVhgADFy3im?utm_source=generator&theme=0"
        width="75%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={iframeStyle}
      ></iframe>
    </div>
  );
}

export default SpotifyPlaylist;
