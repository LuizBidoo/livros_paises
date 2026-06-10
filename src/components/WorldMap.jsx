import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'

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

export default function WorldMap({ countries, loading }) {
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController countries={countries} />
        {countries.map(country =>
          country.latlng?.length === 2 ? (
            <CircleMarker
              key={country.cca3}
              center={country.latlng}
              radius={12}
              pathOptions={{
                color: '#c0392b',
                fillColor: '#e74c3c',
                fillOpacity: 0.7,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{country.flag} {country.name.common}</strong>
                {country.capital?.[0] && (
                  <><br />Capital: {country.capital[0]}</>
                )}
              </Popup>
            </CircleMarker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}
