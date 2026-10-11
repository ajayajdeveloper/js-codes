/**
 * Day 3 — Exercise
 *
 * Build a filterable product list (~10 min)
 *
 * Requirements:
 * 1. Define an array of 6+ products: { id, name, price, category, inStock }
 * 2. Render category filter buttons (derive unique categories from the array)
 * 3. Filter products by selected category
 * 4. Each product card shows: name, price, category badge
 * 5. If inStock is false, show "Out of stock" label and dim the card
 * 6. If no products match the filter, show an empty state message
 *
 * Bonus: Add a sort toggle (price: low→high / high→low)
 *
 * Solution is in day-03-rendering/README.md
 */
import { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'MacBook Pro', price: 2499, category: 'laptops', inStock: true },
  { id: 2, name: 'ThinkPad X1', price: 1899, category: 'laptops', inStock: false },
  { id: 3, name: 'iPad Air', price: 749, category: 'tablets', inStock: true },
  { id: 4, name: 'Galaxy Tab S9', price: 699, category: 'tablets', inStock: true },
  { id: 5, name: 'iPhone 15', price: 999, category: 'phones', inStock: false },
  { id: 6, name: 'Pixel 9', price: 899, category: 'phones', inStock: true },
  { id: 7, name: 'AirPods Pro', price: 249, category: 'audio', inStock: true },
]

export default function Day3Exercise() {
  const [category, setCategory] = useState('all')
  let categories = ['all', ...new Set(PRODUCTS.map(p => p.category))]


  const filtered = category === 'all' ? PRODUCTS : 
  PRODUCTS.filter(p => p.category === category);


  return (
    <div>
      <div>
      {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
                  style={{ fontWeight: category === cat ? 700 : 400 }}>
            {cat}
          </button>
        ))}
      </div>
      { filtered.length === 0 ? <span> no Products in this category </span> :

        filtered.map(product => (
          <div key={product.id} style={{ opacity: product.inStock ? 1 : 0.5 }}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.category}</span>
            {!product.inStock && <span>out of stock</span>}
          </div>
        ))
      }
    </div>
  )
}
