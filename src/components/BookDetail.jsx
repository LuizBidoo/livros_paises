import { getLangDisplay } from '../utils/languages'

export default function BookDetail({ book, countries, countriesLoading, countriesError }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null
  const lang = book.language?.[0]

  return (
    <div className="book-detail">
      <h2>Obra Selecionada</h2>
      <div className="book-detail-content">
        {coverUrl && <img src={coverUrl} alt="" className="book-detail-cover" />}
        <div className="book-detail-info">
          <h3>{book.title}</h3>
          {book.author_name && (
            <p><strong>Autor:</strong> {book.author_name.join(', ')}</p>
          )}
          {book.first_publish_year && (
            <p><strong>Ano:</strong> {book.first_publish_year}</p>
          )}
          <p>
            <strong>Idioma:</strong>{' '}
            {lang ? getLangDisplay(lang) : 'Não informado'}
          </p>
        </div>
      </div>

      <div className="countries-section">
        {countriesLoading && <p className="loading">Buscando países...</p>}
        {countriesError && <p className="error">{countriesError}</p>}
        {!countriesLoading && countries.length > 0 && (
          <>
            <h4>
              Países que falam {lang ? getLangDisplay(lang) : 'esse idioma'} ({countries.length}):
            </h4>
            <ul className="countries-list">
              {countries.map(c => (
                <li key={c.cca3}>
                  <span>{c.flag}</span>
                  {c.name.common}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
