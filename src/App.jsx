import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import Gallery3D from './components/Gallery3D';
import Activities from './components/Activities';
import WishesText from './components/WishesText';
import FlagChain from './components/FlagChain';
import Loader from './components/Loader';
import birthdayMusic from './assets/happy_birthday.mp3';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Play music on first user interaction (click anywhere)
    const playOnInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setMusicPlaying(true);
          setHasInteracted(true);
        }).catch(() => {
          setMusicPlaying(false);
        });
      }
    };

    document.addEventListener('click', playOnInteraction);

    return () => {
      document.removeEventListener('click', playOnInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  return (
    <div className="App">
      {/* Loader */}
      <Loader />

      {/* Flag Decorations */}
      <FlagChain position="left" />
      <FlagChain position="right" />

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={birthdayMusic} type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button className="music-toggle" onClick={toggleMusic} title={musicPlaying ? "Pause Music" : "Play Music"}>
        {musicPlaying ? '🔊' : '🔇'}
      </button>

      <Hero />
      <Gallery3D />
      <Activities />
      <WishesText />

      <footer className="footer">
        <p>Made with 💖🌸 for Anusha</p>
        <p className="year">✨ {new Date().getFullYear()} ✨</p>
      </footer>
    </div>
  );
}

export default App;
