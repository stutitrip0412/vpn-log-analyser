import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const points = [

    {
        country:"India",
        lat:22.97,
        lng:78.65
    },

    {
        country:"Germany",
        lat:51.16,
        lng:10.45
    },

    {
        country:"USA",
        lat:37.09,
        lng:-95.71
    },

    {
        country:"Russia",
        lat:61.52,
        lng:105.31
    }

];

const LiveMap = () => {

    return (

        <div className="rounded-3xl border border-slate-800 bg-[#0B1424] p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold text-white">

                    Live Geolocation Map

                </h2>

                <span className="text-sm text-green-400">

                    ● Live

                </span>

            </div>

            <MapContainer
                center={[20,0]}
                zoom={2}
                scrollWheelZoom={false}
                className="h-[430px] rounded-2xl"
            >

                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {

                    points.map((point)=>(

                        <CircleMarker

                            key={point.country}

                            center={[point.lat,point.lng]}

                            radius={8}

                            pathOptions={{

                                color:"#22C55E",

                                fillColor:"#22C55E"

                            }}

                        >

                            <Popup>

                                {point.country}

                            </Popup>

                        </CircleMarker>

                    ))

                }

            </MapContainer>

        </div>

    );

};

export default LiveMap;