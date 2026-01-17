import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Activities.css';

const Activities = () => {
    const [confetti, setConfetti] = useState([]);
    const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
    const [showWish, setShowWish] = useState(false);
    const [allBlown, setAllBlown] = useState(false);

    // Confetti explosion
    const triggerConfetti = () => {
        const newConfetti = Array.from({ length: 100 }, (_, i) => ({
            id: Date.now() + i,
            left: 50 + (Math.random() - 0.5) * 60,
            color: ['#ff69b4', '#ff1493', '#ffd1dc', '#dda0dd', '#ffb6d9', '#feca57', '#48dbfb'][Math.floor(Math.random() * 7)],
            delay: Math.random() * 0.5,
            rotation: Math.random() * 360
        }));
        setConfetti(newConfetti);
        setTimeout(() => setConfetti([]), 4000);
    };

    // Blow candle
    const blowCandle = (index) => {
        const newCandles = [...candlesLit];
        newCandles[index] = false;
        setCandlesLit(newCandles);

        // Check if all candles are blown
        if (newCandles.every(c => !c)) {
            setAllBlown(true);
            setTimeout(() => setShowWish(true), 500);
        }
    };

    // Reset candles
    const resetCandles = () => {
        setCandlesLit([true, true, true, true, true]);
        setShowWish(false);
        setAllBlown(false);
    };

    return (
        <section className="activities-section" id="activities">
            <div className="container">
                <h2 className="text-center">🎈 Fun Activities 🎈</h2>
                <p className="text-center activities-subtitle">
                    Let's celebrate with some interactive fun!
                </p>

                {/* Confetti Button */}
                <div className="activity-card confetti-card">
                    <h3>🎉 Celebration Confetti</h3>
                    <p>Click the button to release birthday confetti!</p>
                    <motion.button
                        className="confetti-btn"
                        onClick={triggerConfetti}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        🎊 Pop Confetti! 🎊
                    </motion.button>

                    {/* Confetti particles */}
                    <AnimatePresence>
                        {confetti.map(c => (
                            <motion.div
                                key={c.id}
                                className="confetti-piece"
                                style={{ left: `${c.left}%`, backgroundColor: c.color }}
                                initial={{ top: '50%', opacity: 1, rotate: 0 }}
                                animate={{
                                    top: ['50%', '-20%', '120%'],
                                    rotate: c.rotation,
                                    x: (Math.random() - 0.5) * 200
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 3, delay: c.delay, ease: 'easeOut' }}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Candle Blowing */}
                <div className="activity-card candle-card">
                    <h3>🎂 Blow the Candles!</h3>
                    <p>Click each candle to blow it out and make a wish!</p>
                    <div className="cake-container">
                        <div className="cake">
                            <div className="cake-top">
                                {candlesLit.map((lit, index) => (
                                    <div
                                        key={index}
                                        className={`candle ${lit ? 'lit' : 'blown'}`}
                                        onClick={() => lit && blowCandle(index)}
                                    >
                                        <div className={`flame ${lit ? 'flame-lit' : 'flame-blown'}`}></div>
                                        <div className="candle-stick"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="cake-body">
                                <div className="cake-layer layer-1"></div>
                                <div className="cake-layer layer-2"></div>
                            </div>
                        </div>

                        {/* Wish reveal */}
                        <AnimatePresence>
                            {showWish && (
                                <motion.div
                                    className="wish-reveal"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p>✨ Your wish is granted, Anusha! ✨</p>
                                    <p className="wish-text">May all your dreams come true! 🌟</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {allBlown && (
                            <motion.button
                                className="reset-btn"
                                onClick={resetCandles}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                🔄 Light candles again
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activities;
