/**
 * Day 2 — Exercise
 *
 * Build a SearchableList component (~10 min)
 *
 * Requirements:
 * 1. Render a text input (controlled)
 * 2. Below it, render a list of tech items (hardcode at least 8)
 * 3. Filter the list as the user types (case-insensitive)
 * 4. Show a count: "X of Y items"
 * 5. Add a "Clear" button that resets the input to empty
 * 6. If no items match, show "No results for '{query}'"
 *
 * Bonus: highlight the matching part of each item (wrap in <mark>)
 *
 * Solution is in day-02-state-events-forms/README.md
 */
import { useState } from 'react'

function highlightMatch(text, query) {
  if (!query) return text
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text
  const before = text.slice(0, index)
  const match = text.slice(index, index + query.length)
  const after = text.slice(index + query.length)
  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  )
}

export default function Day2Exercise() {
  const [query, setQuery] = useState('');
  const sportList = [
    'Basketball',
    'Football',
    'Tennis',
    'Soccer',
    'Baseball',
    'Hockey',
  ];
  const filteredSportList = sportList.filter(sport => sport.toLowerCase().includes(query.toLowerCase()));

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleClear() {
    setQuery('');
  }

  return (
    <div>
       <input type="text" value={query} onChange={handleChange} placeholder= "Search for a sport" />
       <button onClick={handleClear}>Clear</button>
       <ul>
         {filteredSportList.map(sport => (
          <li key={sport}>{highlightMatch(sport, query)}</li>
         ))}
         {filteredSportList.length === 0 && <p>No results for '{query}'</p>}
        </ul>
        <p>{filteredSportList.length} of {sportList.length} items</p>
    </div>
  );
}
