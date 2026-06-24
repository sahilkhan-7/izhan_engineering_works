"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Standard Leaflet marker (icon assets served from the CDN to avoid bundler path issues).
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Ask for the user's location as soon as the map opens, and pin it.
  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : <Marker position={position} icon={icon} />;
}

export default function MapPicker({ onLocationSelect, defaultLocation }: { onLocationSelect: (lat: number, lng: number) => void; defaultLocation?: { lat: number; lng: number } }) {
  const center = defaultLocation ?? { lat: 26.9124, lng: 75.7873 }; // Default to Jaipur until located.
  const [mapId, setMapId] = useState<number | null>(null);

  useEffect(() => {
    setMapId(Date.now());
  }, []);

  if (!mapId) return <div className="order-map" />;

  return (
    <div className="order-map-wrap">
      <MapContainer key={mapId} center={[center.lat, center.lng]} zoom={13} scrollWheelZoom className="order-map">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
      <span className="map-badge mono">Click map to pin address</span>
    </div>
  );
}
