import { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import WorldMap from './components/WorldMap'
import { getLangQuery } from './utils/languages'
import './App.css'

export default function App() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [countries, setCountries] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [countriesLoading, setCountriesLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [countriesError, setCountriesError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  async function handleSearch(query) {
    setSearchLoading(true)
    setSearchError(null)
    setBooks([])
    setSelectedBook(null)
    setCountries([])
    setCountriesError(null)

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=10&fields=title,author_name,first_publish_year,language,cover_i,key`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Falha ao comunicar com a API de livros.')
      const data = await res.json()
      if (!data.docs?.length) {
        setSearchError('Nenhum livro encontrado para essa pesquisa.')
      } else {
        setBooks(data.docs)
      }
    } catch (err) {
      setSearchError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  async function handleSelectBook(book) {
    setSelectedBook(book)
    setCountries([])
    setCountriesError(null)

    const marcCode = book.language?.[0]
    if (!marcCode) {
      setCountriesError('Este livro não possui idioma informado.')
      return
    }

    const langQuery = getLangQuery(marcCode)
    setCountriesLoading(true)

    try {
      const res = await fetch(`https://restcountries.com/v3.1/lang/${encodeURIComponent(langQuery)}`)
      if (res.status === 404) {
        setCountriesError(`Nenhum país encontrado para o idioma identificado (${marcCode}).`)
        return
      }
      if (!res.ok) throw new Error('Falha ao comunicar com a API de países.')
      const data = await res.json()
      setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
    } catch (err) {
      setCountriesError(err.message)
    } finally {
      setCountriesLoading(false)
    }
  }

  const nothingYet = books.length === 0 && !searchLoading && !searchError

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <header className="app-header">
        <div className="app-header-left">
          <h1>🌍 GlobeBook</h1>
          <p>Pesquise um livro e veja no mapa os países que falam o idioma da obra</p>
        </div>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(d => !d)}
          title={darkMode ? 'Modo claro' : 'Modo noturno'}
        >
          {darkMode ? '☀️ Modo claro' : '🌙 Modo noturno'}
        </button>
      </header>

      <SearchBar onSearch={handleSearch} loading={searchLoading} />

      <div className="app-content">
        <aside className="app-sidebar">
          {searchError && <div className="alert alert-error">{searchError}</div>}
          {nothingYet && (
            <div className="empty-state">
              <p>Pesquise um livro pelo título para começar.</p>
            </div>
          )}
          <BookList books={books} onSelect={handleSelectBook} selected={selectedBook} />
          {selectedBook && (
            <BookDetail
              book={selectedBook}
              countries={countries}
              countriesLoading={countriesLoading}
              countriesError={countriesError}
            />
          )}
        </aside>

        <main className="app-map">
          <WorldMap countries={countries} loading={countriesLoading} darkMode={darkMode} />
        </main>
      </div>
    </div>
  )
}
