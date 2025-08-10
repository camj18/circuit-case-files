import { useEffect, useRef } from 'react'

// Simple animated scene using a canvas with a bouncing dot.

export default function AnimatedScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let x = 0
    let raf

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#3490dc'
      ctx.beginPath()
      ctx.arc(x, 40, 10, 0, Math.PI * 2)
      ctx.fill()
      x = (x + 2) % canvas.width
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas ref={canvasRef} width={200} height={80} className="border flex-1" />
  )
}
