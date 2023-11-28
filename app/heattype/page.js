'use client'
import React, {useState,useEffect} from 'react'
import LocationAggregatorMap from "@/components/Map";
const HomePage = () => {
    const [details, setDetails] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("/api/heattype/");

            const data = await response.json();
            setDetails(data);

            // Create an array of geo coordinates pairs
            const coords = data.map((row) => [
                row.longitude,
                row.latitude,
                row.geo_label,
            ]);
            setCoordinates(coords);
        };
        getData();
    }, []);
    console.log(coordinates)
    return (
        <div className="relative min-h-screen">
            ;
            <LocationAggregatorMap data={coordinates} />
        </div>
    );
};

export default HomePage;