'use client'
import React, {useState,useEffect} from 'react'
import LocationAggregatorMap from "@/components/Map";
const HomePage = () => {
    const [details, setDetails] = useState([]);
    const [heatingDetails, setHeatingDetails] = useState([]);
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
                row.geo_code,
            ]);
            setCoordinates(coords);
        };
        const getHeatingData = async () => {
            const response = await fetch("/api/heattype/specificheatingtype/");
            const data = await response.json();
            setHeatingDetails(data);
        }

        getData();

        getHeatingData();
    }, []);
    console.log(coordinates)
    console.log(heatingDetails)



    return (
        <div className="relative min-h-screen">
            ;
            <LocationAggregatorMap data={coordinates} />
        </div>
    );
};

export default HomePage;