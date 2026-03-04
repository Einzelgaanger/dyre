import { PHRASES } from '../constants/phrases'

const ROW_DURATIONS = [38, 42, 45, 40, 44, 48]

export default function InfiniteWords() {
  return (
    <div className="infinite-words">
      {ROW_DURATIONS.map((duration, i) => (
        <div
          key={i}
          className="infinite-row"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
          }}
        >
          <div className="infinite-track" style={{ animationDuration: `${duration}s` }}>
            {[...PHRASES, ...PHRASES].map((phrase, j) => {
              const isHighlight = phrase === 'Sandy'
              const isHeart = phrase === '♥'
              return (
                <span
                  key={`${i}-${j}`}
                  className={`infinite-word ${isHighlight ? 'infinite-word--highlight' : ''} ${isHeart ? 'infinite-word--heart' : ''}`}
                >
                  {phrase}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
