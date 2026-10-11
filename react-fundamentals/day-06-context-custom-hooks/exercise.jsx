/**
 * Day 6 — Exercise
 *
 * Build a theme switcher using Context + a custom hook (~10 min)
 *
 * Requirements:
 * 1. Create a ThemeContext with createContext
 * 2. Create a ThemeProvider that holds 'light' | 'dark' state
 * 3. Create a useTheme() custom hook that reads the context
 *    (throw an error if called outside the Provider)
 * 4. Build a ThemedCard component that styles itself based on theme
 * 5. Build a ToggleButton that calls the toggle function from context
 * 6. Wrap everything in ThemeProvider and verify the toggle works
 *
 * Bonus: Persist the theme to localStorage using useLocalStorage
 * (write your own or copy from the example)
 *
 * Key insight: any component in the tree can toggle the theme without
 * prop drilling — that's the point of Context.
 *
 * Solution is in day-06-context-custom-hooks/README.md
 */
import { createContext, useContext, useState } from 'react'
const ThemeContext = createContext(null)
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  function toggle(){
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
   }
  }

  function useTheme() {
    const ctx = useContext(ThemeContext)
      if(!ctx){
        throw new Error('some message')
      }
    return ctx
  }
  

  
  return (
    <ThemeContext.Provider value={{theme , toggle}}>
      {children}
    </ThemeContext.Provider>
  )




export default function Day6Exercise() {
  // TODO: create ThemeProvider
  // TODO: create useTheme hook
  // TODO: create ThemedCard, ToggleButton
  // TODO: compose and render

  return (
    <div>
      <p style={{ color: '#f59e0b', marginBottom: 16 }}>
        Complete the exercise — see README.md for instructions and solution.
      </p>
    </div>
  )
}
