/**
 * Day 5 — Exercise
 *
 * Build a Stopwatch using useRef + useState (~10 min)
 *
 * Requirements:
 * 1. Display time as MM:SS.ms (e.g., 00:03.47)
 * 2. Start button — begins counting
 * 3. Stop button — pauses (resume should continue from paused time)
 * 4. Reset button — stops and resets to 00:00.00
 * 5. Store the interval ID in a useRef (not useState)
 * 6. Store elapsed milliseconds in useState (this one SHOULD trigger re-render)
 *
 * Bonus: Add a "Lap" button that records lap times in a list below the stopwatch.
 * Each lap shows the split time (time since last lap).
 *
 * Key insight: interval ID in ref = no unnecessary re-render. Elapsed in state = UI updates.
 *
 * Solution is in day-05-refs-composition-children/README.md
 */
import { useState, useRef, useEffect } from 'react'

export default function Day5Exercise() {
   const [time, setTime ] = useState(0)
   const [running, setRunning] = useState(false)
   const intervalRef = useRef(null)
   
     useEffect(() => {
      if(running){
        intervalRef.current =  setInterval(() => {
      setTime(prev => prev +1)
        }, 10);
      }else{
        clearInterval(intervalRef.current)
      }
      return () => clearInterval(intervalRef.current) 

     },[running])

     function start(){
      setRunning(true)

     }
     function stop(){
      setRunning(false)
     }
     function reset() {
      setRunning(false)
      setTime(0)
    }

    const totalMs = time * 10  
const mins = Math.floor(totalMs / 60000)
const secs = Math.floor((totalMs % 60000) / 1000)
const ms = Math.floor((totalMs % 1000) / 10)

  

  return (
    <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <p>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}.{String(ms).padStart(2,'0')}</p>
    </div>
  )
}
