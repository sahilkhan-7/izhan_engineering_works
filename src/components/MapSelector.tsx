"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";

interface MapSelectorProps {
  onLocationSelect: (coords: {
    lat: number;
    lng: number;
    place: string;
  }) => void;
}

export default function MapSelector({ onLocationSelect }: MapSelectorProps) {
  const [marker, setMarker] = useState({ lat: 26.9124, lng: 75.7873 }); // Default to Jaipur
  const [placeName, setPlaceName] = useState("Jaipur, India");

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
      }
    });
    return <Marker position={marker} icon={markerIcon} />;
  };

  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", // Use leaflet marker or custom
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/marker-shadow.png",
    shadowSize: [41, 41]
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const displayName = data.display_name || "Unknown location";
      setPlaceName(displayName);
      onLocationSelect({ lat, lng, place: displayName });
    } catch (error) {
      console.error("Geocode error", error);
    }
  };

  return (
    <div className="w-full h-[400px] rounded shadow overflow-hidden">
      <MapContainer
        center={[marker.lat, marker.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
