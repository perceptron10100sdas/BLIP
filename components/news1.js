
import React from 'react';

const News = () => {
  const iframeStyle = {
    borderRadius: '12px',
  };

  return (
    <iframe
    className='rounded-md shadow-lg shadow-green-500'
      style={iframeStyle}
      src="https://rss.app/embed/v1/list/tbFRLl1ERlw4BxAM"
      width="850" height="1600"
      frameBorder="0"
      
      
    ></iframe>
  );
};

export default News;
