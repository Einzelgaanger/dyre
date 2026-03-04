import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import InfiniteWords from './components/InfiniteWords'
import FloatingHearts from './components/FloatingHearts'
import HeartGame from './components/HeartGame'
import './App.css'

function App() {
  const [gameOpen, setGameOpen] = useState(false)

  return (
    <div className="app">
      <FloatingHearts />
      <InfiniteWords />
      <Hero />
      <motion.button
        className="game-cta"
        onClick={() => setGameOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Catch hearts for Sandy&apos;s birthday ♡
      </motion.button>
      {gameOpen && (
        <HeartGame
          onClose={() => setGameOpen(false)}
          onPlayAgain={() => setGameOpen(false)}
        />
      )}
    </div>
  )
}

export default App
