import { useState, FormEvent } from 'react';
import { Instrument } from '../types/Instrument';
import InstrumentCard from '../components/InstrumentCard';


function Search() {
  const API_KEY = import.meta.env.VITE_FINANCE_API_KEY;

  const [searchText, setSearchText] = useState<string>("");
  const [result, setResult] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null); 
    setError("");

    try {
      // THE RECOMMENDED FINANCE API ENDPOINT HAS CORS SETTINGS THAT DONT ALLOW ME TO CALL IT FROM LOCALHOST SO I'M USING SIMULATED REPSONSES INSTEAD 

      // const response = await fetch(`https://financeapi.net/v6/finance/quote?region=US&lang=EN&symbols=${searchText}`, {
      //   headers: {
      //     'Authorization': `Bearer ${API_KEY}`,
      //   },
      // });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // const quote = data.quoteResponse.result[0];
      // const instrument: Instrument = {
      //   shortName: quote.shortName,
      //   bid: quote.bid,
      //   ask: quote.ask,
      //   regularMarketPrice: quote.regularMarketPrice,
      //   regularMarketChange: quote.regularMarketChange,
      //   regularMarketChangePercent: quote.regularMarketChangePercent,
      // };
      // setResult(instrument);


      //SIMULATED REPONSE 
      setTimeout(() => {
        const dummyData: Instrument = {
          shortName: "Apple Inc.",
          bid: 195.88,
          ask: 209.55,
          regularMarketPrice: 209.28,
          regularMarketChange: 0.91,
          regularMarketChangePercent: 0.4367,
        };
        setResult(dummyData);
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setResult(null);
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-black text-white flex flex-col justify-center items-center p-4">
      <p className="text-lg mb-4">Search for a Stock Symbol:</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="border p-2 text-black rounded"
          placeholder="AAPL, TSLA, etc."
          disabled={loading}
        />
        <button
          type="submit"
          className={`p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Submit"}
        </button>
      </form>

      {loading && <p className="mt-4 animate-pulse">Fetching data...</p>}

      {error && (
        <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}

    {result && <InstrumentCard instrument={result} />}  
    </div>
  );
}

export default Search;
