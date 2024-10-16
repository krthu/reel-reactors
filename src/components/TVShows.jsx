// TVShows.jsx
import React, { useState, useEffect } from 'react';
import Carusel from './Carusel';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import PosterCaruselItem from './MovieCard';
import Overlay from './Overlay';
import { useNavigate } from 'react-router-dom';
import { getTVShowDetails, fetchAllTVShowsData } from '../api/api';
import './TVShows.css';

const TVShows = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [landingTVShow, setLandingTVShow] = useState(null);
  const [tvShowData, setTVShowData] = useState({});
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);

  // Show footer when scrolled to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle URL changes for overlay
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tvShowIDFromURL = urlParams.get('jbv'); // Get TV show ID from URL

    if (tvShowIDFromURL && !selectedTVShow) {
      const getTVShow = async () => {
        try {
          const tvShow = await getTVShowDetails(parseInt(tvShowIDFromURL));
          setSelectedTVShow(tvShow);
          setShowOverlay(true);
        } catch (error) {
          console.error('Error fetching TV show data:', error);
        }
      };
      getTVShow();
    }
  }, [window.location.search, selectedTVShow]);

  const handleMoreInfoClick = (tvShow) => {
    navigate(`/tv/${tvShow.id}`);
  };

  const handlePosterPress = (tvShow) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      handleMoreInfoClick(tvShow);
    } else {
      setSelectedTVShow(tvShow);
      setShowOverlay(true);
      window.history.pushState({}, '', `?jbv=${tvShow.id}`);
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedTVShow(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  const fillHeader = (tvShowData) => {
    const randomIndex = Math.floor(Math.random() * tvShowData.results.length);
    const firstTVShow = tvShowData.results[randomIndex];
    setLandingTVShow(firstTVShow);
  };

  useEffect(() => {
    if (tvShowData.popular && tvShowData.popular.results.length > 0) {
      fillHeader(tvShowData.popular);
    }
  }, [tvShowData]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await fetchAllTVShowsData();
        fillHeader(data.popular);
        setTVShowData(data);
      } catch (error) {
        console.error('Error fetching TV show data:', error);
      }
    };
    fetchAllData();
  }, []);

  const renderCarusels = () => {
    if (!tvShowData || Object.keys(tvShowData).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {Object.entries(tvShowData).map(([genre, data]) => {
          const tvShowCards = data.results
            .filter((tvShow) => tvShow.poster_path && tvShow.backdrop_path)
            .map((tvShow) => (
              <PosterCaruselItem
                movie={tvShow} // Using 'movie' prop for compatibility
                key={tvShow.id}
                onPress={() => handlePosterPress(tvShow)}
                isSelected={selectedTVShow !== null && tvShow.id === selectedTVShow.id}
              />
            ));

          return (
            <div key={genre} className="popular-tvshow-container">
              <Carusel items={tvShowCards} title={genre} />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="body-container">
        <div className="header-container">
          <Navbar />
          {landingTVShow ? (
            <Header movie={landingTVShow} /> // You may need to adjust the Header component
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="tvshow-genre-container">{renderCarusels()}</div>
      </div>

      {/* Overlay */}
      <Overlay show={showOverlay} onClose={closeOverlay}>
        {selectedTVShow && (
          <Header movie={selectedTVShow} isOverlay={true} onClose={closeOverlay} />
        )}
      </Overlay>

      {/* Footer */}
      {showFooter && <Footer className="footer-container" />}
    </>
  );
};

export default TVShows;
