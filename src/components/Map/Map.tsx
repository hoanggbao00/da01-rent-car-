'use client';
import { useAppContext } from '@/context/AppContext';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import classes from './Map.module.css';
import { RegionDetailAPIRes } from '@/models/res.model';

interface Props {
	height?: string;
}

const Map = ({ height }: Props) => {
	const {
		state: { selectedRegion },
	} = useAppContext();

	const [condinates, setCondinates] = useState<[number, number]>([
		21.0283334, 105.854041,
	]);

	const getCordinates = async () => {
		if (!selectedRegion || selectedRegion.code === -1) return;

		const searchText = encodeURIComponent(
			selectedRegion?.name ?? 'Thành phố Hà Nội'
		);
		const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

		const url = `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`;
		const res = await fetch(url);
		const data = (await res.json()) as RegionDetailAPIRes;

		const lat = data.features[0].properties.lat;
		const lon = data.features[0].properties.lon;

		setCondinates([lat, lon]);
	};

	useEffect(() => {
		if (selectedRegion) {
			getCordinates();
		}
	}, [selectedRegion]);

	return (
		<Container size='xl' className={classes.mapContainer}>
			<MapContainer
				center={condinates}
				zoom={14}
				style={{
					height: height || '300px',
					width: '100%',
					zIndex: 0,
					margin: 0,
				}}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<MapMarker
					latitude={condinates[0]}
					longitude={condinates[1]}
					displayName={selectedRegion?.name ?? 'Việt Nam'}
				/>
			</MapContainer>
		</Container>
	);
};

interface MapMarkerProps {
	latitude: number;
	longitude: number;
	displayName: string;
}

const MapMarker = ({ latitude, longitude, displayName }: MapMarkerProps) => {
	const map = useMap();

	useEffect(() => {
		map.setView([latitude, longitude], 14);
	}, [map, latitude, longitude]);

	return (
		<Marker position={[latitude, longitude]}>
			<Popup>{displayName}</Popup>
		</Marker>
	);
};

export default Map;
