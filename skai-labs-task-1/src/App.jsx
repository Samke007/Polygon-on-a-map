import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import { Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { defaults as defaultControls } from "ol/control";

export default function App() {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      controls: defaultControls(),
    });
    console.log("Fetching polygon data...");
    fetch("src/polygon.json")
      .then((response) => {
        return response.json(); // Return the parsed JSON data
      })
      .then((data) => {
        console.log("Polygon data:", data);
        const polygonCoords = data.polygon;

        // Convert polygon coordinates to OpenLayers format
        const polygonFeature = new Feature({
          geometry: new Polygon([
            polygonCoords.map((coord) => fromLonLat(coord)),
          ]),
        });

        // Add polygon feature to vector layer
        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [polygonFeature],
          }),
        });

        map.addLayer(vectorLayer);

        // Adjust map view to fit the polygon
        map
          .getView()
          .fit(polygonFeature.getGeometry(), { padding: [50, 50, 50, 50] });
      })
      .catch((error) => {
        console.error("Error fetching polygon:", error);
      });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "600px" }}></div>;
}
