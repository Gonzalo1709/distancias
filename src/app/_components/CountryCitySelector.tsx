"use client";
import React, { useState, useEffect } from "react";

export interface CountryCitySelectorProps {
  id: string;
  setData: (data: any) => void;
}

function CountryCitySelector({ id, setData }: CountryCitySelectorProps) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    setData({ country, city });
  }, [country, city]);
  return (
    <div className="flex flex-col items-center justify-around">
      <h1 className="my-5">Ingrese los datos por buscar {id}</h1>
      <div className="flex justify-between">
        <div className="mx-2">
          <h1>País:</h1>
          <input
            className="border-2 border-gray-300 rounded-md text-white bg-black p-1"
            type="text"
            name="country"
            id={id + "country"}
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>

        <div className="mx-2">
          <h1>Ciudad: </h1>
          <input
            className="border-2 border-gray-300 rounded-md text-white bg-black p-1"
            type="text"
            name="city"
            id={id + "city"}
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CountryCitySelector;
