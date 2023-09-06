import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    // Function to load the TradingView widget script
    const loadTradingViewWidget = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "description": "NIfty",
              "proName": "NSE:NIFTY"
            },
            {
              "description": "Bank Nifty",
              "proName": "NSE:BANKNIFTY"
            }
            
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "in"
          
        }
      `;
      
      const container = document.getElementById('tradingview-widget-container');

      if (container) {
        // Append the script to the container if it exists
        container.appendChild(script);
      }
    };

    // Call the function to load the script
    loadTradingViewWidget();

    return () => {
      // Cleanup: Remove the script when the component unmounts
      const container = document.getElementById('tradingview-widget-container');
      const script = document.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"]');

      if (container && script) {
        // Remove the script if it exists in the container
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className='text-black'>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
