import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import './WishesText.css';

const WishesText = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleUnlock = () => {
        if (password === '1801') {
            setIsUnlocked(true);
            setShowPasswordInput(false);
            setWrongPassword(false);
        } else {
            setWrongPassword(true);
            setTimeout(() => setWrongPassword(false), 1000);
        }
    };

    return (
        <section className="wishes-text" id="wishes" ref={ref}>
            <div className="container">
                <motion.div
                    className="wishes-content glass"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            /* Sweet Special Message */
                            <motion.div
                                key="special"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    A Special Message for Anusha 💝🌸
                                </motion.h2>

                                <motion.div
                                    className="wishes-body"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <p>
                                        Dear Anusha, on this special day, I want you to know how incredibly blessed I feel to have you in my life.
                                        Your smile lights up every room you enter, and your kindness touches everyone around you.
                                    </p>

                                    <p>
                                        As you celebrate another year of wonderful memories and embark on new adventures,
                                        may this year bring you endless joy, success, and all the happiness your heart can hold.
                                    </p>

                                    <p>
                                        These photos celebrate the amazing person you are and the light you bring to everyone who knows you.
                                        Each one captures a beautiful memory and a different side of your wonderful personality.
                                    </p>

                                    <p className="signature">
                                        May your birthday be as amazing and beautiful as you are, Anusha! 🎉✨🌺
                                    </p>

                                    <p className="closing">
                                        With love and warmest wishes,<br />
                                        <span className="heart">❤️</span>
                                    </p>
                                </motion.div>

                                {/* Secret Unlock Section */}
                                <div className="unlock-section">
                                    <div className="unlock-hint">
                                        <p>🔒 There's a secret message hidden here...</p>
                                    </div>

                                    {!showPasswordInput ? (
                                        <motion.button
                                            className="unlock-btn"
                                            onClick={() => setShowPasswordInput(true)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            🔐 Unlock Secret Message
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            className="riddle-box"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <div className="riddle-text">
                                                <h4>🧩 Solve this riddle to unlock:</h4>
                                                <p className="riddle">
                                                    "The day I came to this world,<br />
                                                    A special date was unfurled.<br />
                                                    Day first, then month in line,<br />
                                                    Four digits make me shine! ✨"
                                                </p>
                                                <p className="riddle-hint">(Enter DDMM format)</p>
                                            </div>

                                            <div className="password-input-container">
                                                <input
                                                    type="password"
                                                    placeholder="Enter the secret code..."
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={wrongPassword ? 'shake' : ''}
                                                    maxLength={4}
                                                />
                                                <motion.button
                                                    className="submit-btn"
                                                    onClick={handleUnlock}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    🔓 Unlock
                                                </motion.button>
                                            </div>
                                            {wrongPassword && (
                                                <p className="wrong-password">❌ Wrong code! Try again...</p>
                                            )}
                                            <button
                                                className="cancel-btn"
                                                onClick={() => setShowPasswordInput(false)}
                                            >
                                                Cancel
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            /* Sarcastic Roast Message - Unlocked! */
                            <motion.div
                                key="roast"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="unlocked-badge">
                                    🔓 SECRET UNLOCKED! 🔓
                                </div>

                                <motion.h2
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    A Special Roast for Anusha 🔪😈
                                </motion.h2>

                                <motion.div
                                    className="wishes-body roast-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <p>
                                        Dear Anusha, oh the <span className="highlight">momo-obsessed</span> mountain girl! 🥟🏔️
                                        Another year of surviving your legendary <span className="danger">killer stare</span> and
                                        that iconic laugh that sounds like a villain from a horror movie! 😂🔪
                                    </p>

                                    <p>
                                        Let's be honest – you'd sell your soul for a plate of momos, and your
                                        dream vacation is basically any mountain where you can pretend to be
                                        a peaceful person (we all know the truth 👀). When you get angry, you
                                        don't just get mad – you turn <span className="red-text">🔴 FULL RED 🔴</span> like
                                        a tomato ready to explode! 🍅💥
                                    </p>

                                    <p>
                                        And can we talk about your <span className="highlight">"friendly"</span> habit of
                                        threatening me with that invisible knife? 🔪 "I'll kill you" is basically
                                        your love language at this point! Your serial killer laugh doesn't help
                                        either – <span className="evil-laugh">MUAHAHAHA!</span> 😈
                                    </p>

                                    <p>
                                        But honestly (and don't let this go to your head), having a
                                        psycho- I mean, <em>wonderful</em> friend like you makes life
                                        interesting! Here's to more momos, more mountains, and hopefully
                                        less death threats! 🥟🏔️🔪
                                    </p>

                                    <p className="signature">
                                        Happy Birthday, you adorable menace! Try not to kill anyone today! 🎂🔪😂
                                    </p>

                                    <p className="closing">
                                        From your future victim who somehow survived another year,<br />
                                        <span className="heart">💀❤️🔪</span>
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default WishesText;
