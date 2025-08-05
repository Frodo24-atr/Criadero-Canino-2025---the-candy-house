// OPCIÓN 2: Mapa Interactivo con @react-google-maps/api
// 
// 1. INSTALAR: npm install @react-google-maps/api
// 
// 2. OBTENER API KEY:
//    - Ve a Google Cloud Console
//    - Habilita Google Maps JavaScript API
//    - Crea una API key
// 
// 3. CÓDIGO PARA EL COMPONENTE:

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const containerStyle = {
    width: '100%',
    height: '256px',
    borderRadius: '1rem'
  };

  // Coordenadas de Buenos Aires (reemplaza con tu ubicación)
  const center = {
    lat: -34.6131515,
    lng: -58.4437056
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry.fill',
        stylers: [{ color: '#fef3c7' }] // Color amber suave
      }
    ]
  };

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
        <Marker 
          position={center}
          title="The Candy House - Criadero"
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

// 4. LUEGO IMPORTAR EN Contacto.js:
// import MapComponent from './MapComponent';
// 
// Y reemplazar el iframe con:
// <MapComponent />
