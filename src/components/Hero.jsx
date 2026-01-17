import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Hero.css';

// Dynamically import photos from src/assets/anusha for hero background
const photoModules = import.meta.glob('../assets/anusha/*.{jpg,jpeg,png,webp}', { eager: true });
const sortedPhotos = Object.entries(photoModules)
    .sort((a, b) => {
        const aNum = parseInt(a[0].match(/\d+/)?.[0] || 0);
        const bNum = parseInt(b[0].match(/\d+/)?.[0] || 0);
        return aNum - bNum;
    })
    .map(entry => entry[1].default || entry[1]);

// Select a few images for the background
const bgImages = sortedPhotos.slice(0, 6);

const Hero = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const scrollToGallery = () => {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="particles"></div>

            {/* Background Images */}
            <div className="hero-bg-images">
                {bgImages.map((src, index) => (
                    <img key={index} src={src} alt="" className="hero-bg-img" />
                ))}
            </div>

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 50 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: show ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    className="birthday-emoji"
                >
                    🌸🎂🌸
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: show ? 1 : 0, y: show ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    Happy Birthday Anusha!
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: show ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    🌺 Wishing you a day filled with love, laughter, and unforgettable moments 🌺
                </motion.p>

                <motion.button
                    className="btn"
                    onClick={scrollToGallery}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Memories ✨
                </motion.button>
            </motion.div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
