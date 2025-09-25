import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock de MapContainer de react-leaflet pour éviter le rendu de Leaflet dans JSDOM
jest.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  };
});

import Map from '@/components/Map/Map';

describe('Map component', () => {
  it('render correctement les marqueurs et popups', () => {
    render(<Map />);

    // Vérifie la présence de la carte
    expect(screen.getByTestId('map')).toBeInTheDocument();

    // Vérifie les 2 marqueurs
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(2);

    // Vérifie les popups
    const popups = screen.getAllByTestId('popup');
    expect(popups).toHaveLength(2);

    // Vérifie les textes
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Lille/i)).toBeInTheDocument();

    // Vérifie le bouton
    expect(screen.getByText(/TEST/i)).toBeInTheDocument();
  });
});
