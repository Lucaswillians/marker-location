import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import './index.css'
import { useState } from "react"

export default function Map() {
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState(null)

  const fetchAddress = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
    const data = await response.json()
    setAddress(data)
  }

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        fetchAddress(lat, lng)
      }
    })
    return null
  }

  return (
    <div className="container">
      <div className="map">
        <MapContainer
          className="map-container"
          center={[-26.304408, -48.848017]}
          zoom={13}>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <div className="info">
        {
         position && (
          <div>
            <h2>Coordenadas</h2>
            <p><strong>Latitude:</strong> {position[0]}</p>
            <p><strong>Longitude:</strong> {position[1]}</p>
          </div>
        )
        }

        {
         address && (
          <div>
            <h2>Endereço</h2>
            <p><strong>Endereço completo:</strong> {address.display_name}</p>
            <p><strong>CEP:</strong> {address.address?.postcode || "Não disponível"}</p>
            <p><strong>Cidade:</strong> {address.address?.city || address.address?.town || "Não disponível"}</p>
          </div>
          )
       }
      </div>
    </div>
  )
}
