// TVShowInformation.jsx
import React, { useEffect, useState } from 'react';
import './TVShowInformation.css';
import { getTVShowDetails } from '../api/api'; // Use the correct API function
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MovieHeader from './MovieHeader'; // Reuse MovieHeader

const TVShowInformation = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [showFooter] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('TV Show ID is undefined');
      return;
    }

    const fetchTVShowData = async () => {
      try {
        const tvShowData = await getTVShowDetails(id);
        setTVShow(tvShowData);
      } catch (error) {
        console.error('Error fetching TV show data:', error);
      }
    };

    fetchTVShowData();
  }, [id]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="tvshow-information-container">
        <Navbar />
        <MovieHeader movie={tv} /> {/* Reuse MovieHeader for TV shows */}
        {/* Additional sections like CastList and Recommendations */}
        {/* You can create and include components for Cast and Recommendations */}
      </div>

      {/* Footer */}
      {showFooter && <Footer className="footer-container" />}
    </>
  );
};

export default TVShowInformation;
