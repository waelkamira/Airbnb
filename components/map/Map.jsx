'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

export default function Map({ latlng }) {
  //?  select حصلنا عليها من قيمة ال latlng

  const Icon = icon({
    iconUrl:
      'https://images.vexels.com/media/users/3/131261/isolated/lists/b2e48580147ca0ed3f970f30bf8bb009-map-location-marker.png',
    iconSize: [30, 30],
  });
  return (
    <div>
      <MapContainer
        //?بدل المركز Select من latlng هنا قمنا بتمرير قيمة
        center={latlng || [27, 30]}
        zoom={6}
        className="h-[350px] w-auto rounded-sm"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* //? مؤشر الخريطة */}
        <Marker position={latlng || [27, 30]} icon={Icon} />
      </MapContainer>
    </div>
  );
}
