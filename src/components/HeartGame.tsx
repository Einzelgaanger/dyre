import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET_SCORE = 15
const SPAWN_INTERVAL = 800
const FALL_DURATION_MIN = 5
const FALL_DURATION_MAX = 7
const GAME_SYMBOLS = ['♥', '💕', '💗', '💖', '🌸']

type FallingHeart = {
  id: number
  x: number
  symbol: string
  duration: number
  delay: number
}

type Props = {
  onClose: () => void
  onPlayAgain: () => void
}

export default function HeartGame({ onClose, onPlayAgain }: Props) {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [nextId, setNextId] = useState(0)
  const [won, setWon] = useState(false)

  const addHeart = useCallback(() => {
    if (won) return
    setHearts((prev) => [
      ...prev,
      {
        id: nextId,
        x: 10 + Math.random() * 80,
        symbol: GAME_SYMBOLS[Math.floor(Math.random() * GAME_SYMBOLS.length)],
        duration: FALL_DURATION_MIN + Math.random() * (FALL_DURATION_MAX - FALL_DURATION_MIN),
        delay: Math.random() * 0.5,
      },
    ])
    setNextId((n) => n + 1)
  }, [nextId, won])

  useEffect(() => {
    addHeart()
    const t = setInterval(addHeart, SPAWN_INTERVAL)
    return () => clearInterval(t)
  }, [addHeart])

  const catchHeart = (id: number) => {
    if (won) return
    setHearts((prev) => prev.filter((h) => h.id !== id))
    setScore((s) => {
      const next = s + 1
      if (next >= TARGET_SCORE) setWon(true)
      return next
    })
  }

  const handlePlayAgain = () => {
    onPlayAgain()
  }

  return (
    <div className="game-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="game-header">
          <span>Hearts: {score} / {TARGET_SCORE}</span>
          <button type="button" className="game-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="game-area">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="game-heart"
                style={{
                  left: `${h.x}%`,
                  fontSize: '2rem',
                }}
                initial={{
                  top: '-30px',
                  opacity: 1,
                }}
                animate={{
                  top: '100%',
                  opacity: 1,
                  transition: {
                    duration: h.duration,
                    delay: h.delay,
                    ease: 'linear',
                  },
                }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ exit: { duration: 0.2 } }}
                onClick={() => catchHeart(h.id)}
              >
                {h.symbol}
              </motion.div>
            ))}
          </AnimatePresence>
          {won && (
            <motion.div
              className="game-win-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="game-win-emoji">💕</span>
              <h2 className="game-win-title">Sandy feels so loved on her birthday!</h2>
              <p className="game-win-sub">You did it!</p>
              <button type="button" className="game-play-again" onClick={handlePlayAgain}>
                Play again
              </button>
            </motion.div>
          )}
        </div>
        {!won && (
          <p className="game-hint">Click or tap the hearts to catch them. Get {TARGET_SCORE} for Sandy!</p>
        )}
      </motion.div>
    </div>
  )
}
