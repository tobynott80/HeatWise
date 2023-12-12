'use client'
import React, {useState,useEffect} from 'react'
import LocationAggregatorMap from "@/components/Map";
const HomePage = () => {
    const [data, setData] = useState([]);
    const [heatingData, setHeatingData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("/api/heattype/");

            const data = await response.json();
            setData(data);

            const ApiHeatingData = data.map((row) => ({
                geoCode: row.geo_code,
                geoLabel: row.geo_label,
                xCoordinate: row.x_coordinate,
                yCoordinate: row.y_coordinate,
                detached: {
                    biomass: row.detached_Biomass,
                    gas: row.detached_Gas,
                    oil: row.detached_Oil,
                    resistance: row.detached_Resistance,
                },
                flats: {
                    biomass: row.flats_Biomass,
                    gas: row.flats_Gas,
                    oil: row.flats_Oil,
                    resistance: row.flats_Resistance,
                },
                semiDetached: {
                    biomass: row.semi_detached_Biomass,
                    gas: row.semi_detached_Gas,
                    oil: row.semi_detached_Oil,
                    resistance: row.semi_detached_Resistance,
                },
                terraced: {
                    biomass: row.terraced_Biomass,
                    gas: row.terraced_Gas,
                    oil: row.terraced_Oil,
                    resistance: row.terraced_Resistance,
                },
            }));
            setHeatingData(ApiHeatingData);
        };
        getData();
    }, []);
    // console.log(heatingData)


    return (
        <div className="relative min-h-screen">
            <LocationAggregatorMap data={heatingData} />
        </div>
    );
};

export default HomePage;