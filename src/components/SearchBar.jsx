import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Pesquisar livro pelo título..."
        disabled={loading}
        aria-label="Título do livro"
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}
