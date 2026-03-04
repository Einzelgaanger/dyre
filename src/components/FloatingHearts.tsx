import { useMemo } from 'react'

const HEARTS = ['♥', '💕', '💗']

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function FloatingHearts() {
  const items = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: random(0, 100),
        delay: random(0, 4),
        duration: random(8, 14),
        fontSize: random(14, 32),
        emoji: HEARTS[i % HEARTS.length],
      })),
    []
  )

  return (
    <div className="floating-hearts">
      {items.map(({ id, left, delay, duration, fontSize, emoji }) => (
        <div
          key={id}
          className="floating-heart"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize: `${fontSize}px`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}
