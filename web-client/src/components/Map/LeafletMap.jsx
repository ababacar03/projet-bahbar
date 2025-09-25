"use client";

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix des icônes manquantes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LeafletMap({bars}) {
    return (
        <MapContainer
            center={[50.6292, 3.0573]}
            zoom={13}
            style={{height: "100vh", width: "100%"}}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {bars && bars.map((bar) => {
                const lat = bar.location?.lat || bar.latitude;
                const lng = bar.location?.lng || bar.longitude;

                if (lat == null || lng == null) return null;

                return (
                    <Marker key={bar._id} position={[lat, lng]}>
                        <Popup>
                            <div>
                                <h3>{bar.name || bar.nameBar}</h3>
                                <p>{bar.address}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
