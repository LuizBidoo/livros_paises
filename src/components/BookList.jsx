import BookCard from './BookCard'

export default function BookList({ books, onSelect, selected }) {
  if (!books.length) return null

  return (
    <div className="book-list">
      <h2>Resultados ({books.length})</h2>
      <ul>
        {books.map(book => (
          <li key={book.key}>
            <BookCard
              book={book}
              onSelect={onSelect}
              isSelected={selected?.key === book.key}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
