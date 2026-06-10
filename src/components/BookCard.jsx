import { getLangDisplay } from '../utils/languages'

export default function BookCard({ book, onSelect, isSelected }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
    : null

  const meta = [
    book.first_publish_year,
    book.language?.[0] ? getLangDisplay(book.language[0]) : null,
  ].filter(Boolean).join(' · ')

  return (
    <button
      className={`book-card${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(book)}
    >
      <div className="book-card-cover">
        {coverUrl
          ? <img src={coverUrl} alt="" />
          : <span className="no-cover">Sem capa</span>
        }
      </div>
      <div className="book-card-info">
        <strong>{book.title}</strong>
        {book.author_name && (
          <span>{book.author_name.slice(0, 2).join(', ')}</span>
        )}
        {meta && <span className="book-meta">{meta}</span>}
      </div>
    </button>
  )
}
