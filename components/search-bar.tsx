// components/search-bar.tsx
'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchResult {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            debouncedQuery
          )}&per_page=5`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch results')
        }

        const data = await response.json()
        setResults(data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search GitHub users...'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        {loading && (
          <div className='absolute right-3 top-2.5'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500'></div>
          </div>
        )}
      </div>

      {error && (
        <div className='mt-2 p-2 bg-red-100 text-red-700 rounded-md'>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <ul className='mt-2 bg-white border border-gray-200 rounded-lg shadow-md'>
          {results.map((user) => (
            <li
              key={user.id}
              className='p-3 hover:bg-gray-50 transition-colors'
            >
              <a
                href={user.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-3'
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className='w-10 h-10 rounded-full'
                />
                <span className='font-medium text-gray-900'>{user.login}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
