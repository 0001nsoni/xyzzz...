import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Gallery3D.css';

// Dynamically import all photos from src/assets/anusha
const photoModules = import.meta.glob('../assets/anusha/*.{jpg,jpeg,png,webp}', { eager: true });
const photos = Object.values(photoModules).map(mod => mod.default || mod);

// Sort photos numerically based on filename if possible to maintain order
// The keys look like '../assets/anusha/1.jpg'
const sortedPhotoEntries = Object.entries(photoModules).sort((a, b) => {
    const aNum = parseInt(a[0].match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b[0].match(/\d+/)?.[0] || 0);
    return aNum - bNum;
});

const sortedPhotos = sortedPhotoEntries.map(entry => entry[1].default || entry[1]);

const Gallery3D = () => {
    const [polaroids, setPolaroids] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const cols = isMobile ? 2 : 5;

        // Use sortedPhotos to ensure 1.jpg, 2.webp etc. are in order
        const positions = sortedPhotos.map((photo, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);

            const baseLeft = isMobile ? (col * 45) + 5 : (col * 18) + 5;
            const baseTop = isMobile ? (row * 8.5) + 1 : (row * 25) + 5;

            return {
                photo,
                top: baseTop + (Math.random() * 3 - 1.5),
                left: baseLeft + (Math.random() * 3 - 1.5),
                rotation: Math.random() * 20 - 10,
                delay: index * 0.08,
                index
            };
        });
        setPolaroids(positions);

        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    return (
        <section className="gallery-3d" id="gallery">
            <div className="container">
                <h2 className="text-center">🌸 Precious Memories 🌸</h2>
                <p className="text-center gallery-subtitle">
                    Every moment captured tells a beautiful story
                </p>

                <div className="polaroid-scatter-container">
                    {/* Polaroid photos */}
                    {polaroids.map((item, index) => (
                        <motion.div
                            key={index}
                            className="polaroid-card"
                            style={{
                                top: `${item.top}%`,
                                left: `${item.left}%`,
                                transform: `rotate(${item.rotation}deg)`,
                            }}
                            initial={{ opacity: 0, scale: 0, rotate: item.rotation + 180 }}
                            animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
                            transition={{
                                duration: 0.6,
                                delay: item.delay,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.15,
                                zIndex: 100,
                                rotate: 0,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="polaroid-photo">
                                <img src={item.photo} alt={`Memory ${index + 1}`} />
                            </div>
                            <div className="polaroid-label">
                                <span className="photo-number">{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="gallery-instructions">
                    <p>✨ Hover over photos to see them up close ✨</p>
                </div>
            </div>
        </section>
    );
};

export default Gallery3D;
