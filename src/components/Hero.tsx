import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h1
        animate={{
          textShadow: [
            '0 0 20px rgba(233, 30, 99, 0.4)',
            '0 0 30px rgba(233, 30, 99, 0.6)',
            '0 0 20px rgba(233, 30, 99, 0.4)',
          ],
        }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        Sandy
      </motion.h1>
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Happy Birthday! You&apos;re so loved
      </motion.p>
    </motion.div>
  )
}
