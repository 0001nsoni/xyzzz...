import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const minLoadTime = 1000; // 1 second minimum
    let pageLoadTime = 0;

    const handlePageLoad = () => {
      pageLoadTime = Date.now();
      hideLoader();
    };

    // If page is already loaded
    if (document.readyState === 'complete') {
      pageLoadTime = Date.now();
      hideLoader();
    } else {
      // Wait for page to load
      window.addEventListener('load', handlePageLoad);
    }

    // Fallback: hide loader after max time (5 seconds)
    const maxTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    function hideLoader() {
      const elapsed = Date.now() - pageLoadTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, remainingTime);

      return () => clearTimeout(hideTimeout);
    }

    return () => {
      window.removeEventListener('load', handlePageLoad);
      clearTimeout(maxTimeout);
    };
  }, []);

  return (
    <div className={`loader ${!isVisible ? 'hidden' : ''}`}>
      <div className="loader-content">
        <img src="/200.gif" alt="Birthday" className="loader-image" />
        <div className="loader-text">
          <h1>Happy Birthday! 🎉</h1>
          <p>Loading your special celebration...</p>
        </div>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader;
