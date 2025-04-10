import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IMapDataPoint } from '../../../app/shared/interfaces';

interface MapProps {
  mapDataPoints: IMapDataPoint[];
  zoom?: number;
  width?: string;
  height?: string;
  className?: string;
  dataTestId?: string;
}

const MapContainer = styled.div<{ $width: string; $height: string }>`
  width: ${props => props.$width};
  height: ${props => props.$height};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Map: React.FC<MapProps> = ({
  mapDataPoints,
  zoom = 8,
  width = '100%',
  height = '400px',
  className,
  dataTestId = 'map',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      
      const defaultCenter = { lat: 39.5, lng: -98.35 };
      
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        zoom,
        center: defaultCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      
      if (mapDataPoints.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
        
        mapDataPoints.forEach(point => {
          if (!googleMapRef.current) return;
          
          const position = {
            lat: (point as any).latitutde || 0, // Using latitutde as defined in the interface
            lng: point.longitude || 0,
          };
          
          const marker = new google.maps.Marker({
            position,
            map: googleMapRef.current,
            title: point.markerText || '',
          });
          
          markersRef.current.push(marker);
          bounds.extend(position);
        });
        
        if (mapDataPoints.length > 1 && googleMapRef.current) {
          googleMapRef.current.fitBounds(bounds);
        }
      }
    };
    
    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error('Google Maps API not loaded');
    }
    
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [mapDataPoints, zoom]);
  
  return (
    <MapContainer
      ref={mapRef}
      $width={width}
      $height={height}
      className={className}
      data-testid={dataTestId}
    />
  );
};

export default Map;
