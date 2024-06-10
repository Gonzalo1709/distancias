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

  const [result, setResult] = useState<string>("");

  const handleSubmit = (event: any) => {
    if (!data1 || !data2) {
      alert("Please fill all the fields");
      return;
    }
    const params = new URLSearchParams({
      country1: data1.country,
      city1: data1.city,
      country2: data2.country,
      city2: data2.city,
    });
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.distance);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (result !== "") {
    return (
      <div className="flex flex-col items-center justify-evenly h-[100vh]">
        <div>
          <h1 className="text-2xl">La distancia entre las ciudades es: </h1>
          <h2 className="text-4xl">{result} kilometros</h2>
        </div>
        <button
          onClick={() => setResult("")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go back
        </button>
      </div>
    );
  }
  return (
    <form
      className="flex flex-col items-center justify-evenly h-[100vh]"
      onSubmit={handleSubmit}
    >
      <CountryCitySelector id="1" setData={setData1} />
      <CountryCitySelector id="2" setData={setData2} />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
