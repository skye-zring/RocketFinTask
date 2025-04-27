import { useState, FormEvent } from "react";
import { Instrument } from "../types/Instrument";

interface InstrumentCardProps {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: InstrumentCardProps) {
  const [shares, setShares] = useState<number>(0);

  const handleBuy = (e: FormEvent) => {
    e.preventDefault();

    if (shares <= 0) {
      alert("Please enter a valid number of shares greater than 0.");
      return;
    }

    // HERE WOULD BE THE CALL TO THE BACKEND TO PURCHASE THE SHARES 
    
    console.log(`Buying ${shares} shares of ${instrument.shortName} at $${instrument.regularMarketPrice} each.`);
    alert(`Successfully placed order for ${shares} shares of ${instrument.shortName}!`);
    
    setShares(0);
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">{instrument.shortName}</h2>
      <div className="space-y-2 mb-6">
        <p>Bid Price: <span className="font-semibold">${instrument.bid.toFixed(2)}</span></p>
        <p>Ask Price: <span className="font-semibold">${instrument.ask.toFixed(2)}</span></p>
        <p>Current Price: <span className="font-semibold">${instrument.regularMarketPrice.toFixed(2)}</span></p>
        <p>Change: <span className="font-semibold">{instrument.regularMarketChange.toFixed(2)}</span></p>
        <p>Change (%): <span className="font-semibold">{instrument.regularMarketChangePercent.toFixed(2)}%</span></p>
      </div>

      <form onSubmit={handleBuy} className="flex flex-col gap-4 items-center">
        <input
          type="number"
          min="1"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          placeholder="Enter number of shares"
          className="p-2 rounded text-black w-48"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Buy Shares
        </button>
      </form>
    </div>
  );
}
