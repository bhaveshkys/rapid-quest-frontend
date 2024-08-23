import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import stateMappings from '../public/stateMappings.json'; // Import your state mappings JSON
import { FeatureCollection } from 'geojson';

// Sample GeoJSON for US states
import usStatesGeoJson from '../public/us-states.json'; // Ensure this file contains the correct GeoJSON data

import customerData from "@/public/customerlocation.json"
const MapComponent = () => {
    const [customerDataa,SetCustomerData]=useState<any[]>([])
  // Function to get full state name from abbreviation
  const getStateFullName = (abbreviation: string ) => {
    const stateObj = stateMappings.find(state => state.abbreviation === abbreviation);
    return stateObj ? stateObj.state : null;
  };

  // Function to style each state based on customer count
  const getStateStyle = (stateName:string) => {
    const stateData = customerData.find(data => getStateFullName(data.state) === stateName);
    const count = stateData ? stateData.count : 0;
    return {
      fillColor: count > 50 ? 'red' :
                 count > 20 ? 'orange' :
                 count > 10 ? 'yellow' :
                 count > 5  ? 'green' :
                 count > 0  ? 'blue' :
                              'gray',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  // Function to handle each state feature
  const onEachState = (feature:any, layer:any) => {
    const stateName = feature.properties.name;
    const stateData = customerData.find(data => getStateFullName(data.state) === stateName);
    const count = stateData ? stateData.count : 0;

    layer.setStyle(getStateStyle(stateName));

    // Add a tooltip or popup
    layer.bindPopup(`${stateName}: ${count} customers`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rapid-quest-backend.adaptable.app/api/customers/geographical-distribution`);
        const data = await response.json();
        SetCustomerData(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: "338px", width: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={usStatesGeoJson as FeatureCollection} onEachFeature={onEachState} />
    </MapContainer>
  );
};

export default MapComponent;