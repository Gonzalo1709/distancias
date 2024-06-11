"use client";
import React, { useEffect, useState } from "react";
import CountryCitySelector from "./_components/CountryCitySelector";

export interface dataType {
  country: string;
  city: string;
}

export default function Home() {
  const [data1, setData1] = useState<dataType | null>(null);
  const [data2, setData2] = useState<dataType | null>(null);
  const [data3, setData3] = useState<dataType | null>(null);
  const [option, setOption] = useState<string>("twoCities");
  const [result, setResult] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const params = new URLSearchParams({
      country1: data1!.country,
      city1: data1!.city,
      country2: data2!.country,
      city2: data2!.city,
      country3: data3 ? data3.country : '',
      city3: data3 ? data3.city : '',
      option,
    });

    fetch(`http://127.0.0.1:5000/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.closest_distance);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  return (
    <form
      className="flex flex-col items-center justify-evenly h-[100vh]"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-around items-center">
        <label>
          <input
            type="radio"
            name="option"
            value="twoCities"
            checked={option === "twoCities"}
            onChange={() => setOption("twoCities")}
          />
          Calcular distancia entre dos ciudades
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="threeCities"
            checked={option === "threeCities"}
            onChange={() => setOption("threeCities")}
          />
          Encontrar las dos ciudades más cercanas
        </label>
      </div>
      <CountryCitySelector id="1" setData={setData1} />
      <CountryCitySelector id="2" setData={setData2} />
      {option === "threeCities" && (
        <CountryCitySelector id="3" setData={setData3} />
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      {result && (
        <div className="flex flex-col items-center justify-evenly">
          <h1 className="text-2xl">{option === "twoCities" ? "La distancia entre las ciudades es:" : "Las ciudades más cercanas son:"}</h1>
          {option === "twoCities" ? (
          <h2 className="text-4xl">{result} kilómetros</h2>
          ) : (
          <h2 className="text-4xl">{result}</h2>
          )}
        </div>
      )}
    </form>
  );
}
