import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

function MapController({ countries }) {
  const map = useMap()

  useEffect(() => {
    if (!countries.length) {
      map.flyTo([20, 0], 2, { duration: 1 })
      return
    }
    const valid = countries.filter(c => c.latlng?.length === 2)
    if (!valid.length) return

    if (valid.length === 1) {
      map.flyTo(valid[0].latlng, 5, { duration: 1.5 })
    } else {
      const lats = valid.map(c => c.latlng[0])
      const lngs = valid.map(c => c.latlng[1])
      map.flyToBounds(
        [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]],
        { padding: [60, 60], maxZoom: 5, duration: 1.5 },
      )
    }
  }, [countries, map])

  return null
}

function flagIcon(country) {
  const src = country.flags?.svg || country.flags?.png || ''
  return L.divIcon({
    className: '',
    html: `<div class="flag-sphere"><img src="${src}" alt="${country.name.common}" /></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  })
}

export default function WorldMap({ countries, loading, darkMode }) {
  const tileUrl = darkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const tileAttribution = darkMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  return (
    <div className="world-map">
      {loading && (
        <div className="map-loading">Buscando países no mapa...</div>
      )}
      {!loading && countries.length === 0 && (
        <div className="map-empty">
          <p>Selecione um livro para ver os países destacados no mapa</p>
        </div>
      )}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        minZoom={1}
      >
        <TileLayer key={tileUrl} url={tileUrl} attribution={tileAttribution} />
        <MapController countries={countries} />
        {countries.map(country =>
          country.latlng?.length === 2 ? (
            <Marker
              key={country.cca3}
              position={country.latlng}
              icon={flagIcon(country)}
            >
              <Popup>
                <strong>{country.flag} {country.name.common}</strong>
                {country.capital?.[0] && (
                  <><br />Capital: {country.capital[0]}</>
                )}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}
