import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../types/Transaction";
import { PortfolioItem } from "../types/PortfolioItem";
import PortfolioCard from "../components/PortfolioCard"; 

export default function Instrument() {
  const { ticker } = useParams();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [sellShares, setSellShares] = useState<number>(0);
  const [selling, setSelling] = useState<boolean>(false);
  const [sellError, setSellError] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!ticker) return;

      setLoading(true);
      setError("");

      try {
        setTimeout(() => {

           // THERE WOULD BE AN API CALL TO THE BACKEND TO GET THE PORTFLIO ITEM DETAILS  
          const dummyPortfolioItem: PortfolioItem = {
            ticker: ticker,
            shortName: ticker === "AAPL" ? "Apple Inc." : ticker === "TSLA" ? "Tesla Inc." : "Unknown Company",
            costBasis: 15000,
            marketValue: 18000,
            unrealizedReturnRate: 20,
            unrealizedProfitLoss: 3000,
            totalShares: 50,
            };
          // THERE WOULD BE AN API CALL TO THE BACKEND TO GET THE TRANSACTIONS 
          const dummyTransactions: Transaction[] = [
            {
              shortName: ticker,
              sharesTraded: 10,
              operation: "BUY",
              value: 1500,
              date: "2024-04-01T10:00:00Z", 
            },
            {
              shortName: ticker,
              sharesTraded: 5,
              operation: "BUY",
              value: 800,
              date: "2024-04-15T14:30:00Z",
            },
            {
              shortName: ticker,
              sharesTraded: 3,
              operation: "SELL",
              value: 600,
              date: "2024-04-25T09:45:00Z",
            },
          ];
          
          setPortfolioItem(dummyPortfolioItem);
          setTransactions(dummyTransactions);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [ticker]);

  const handleSell = async (e: FormEvent) => {
    e.preventDefault();
    setSelling(true);
    setSellError("");

    try {
      if (sellShares <= 0) {
        throw new Error("Please enter a valid number of shares to sell.");
      }

      if (portfolioItem && sellShares > portfolioItem.totalShares) {
        throw new Error("You cannot sell more shares than you own.");
      }

      // SIMULATING CALLING THE SELL ENDPOINT
      setTimeout(() => {
        console.log(`Selling ${sellShares} shares of ${ticker}`);
        alert(`Successfully sold ${sellShares} shares of ${ticker}!`);
        setSelling(false);
        setSellShares(0); 
      }, 1500);
    } catch (err: any) {
      setSellError(err.message || "Failed to sell shares.");
      setSelling(false);
    }
  };

  return (
    <div className="min-h-screen mt-[64px] bg-black text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-6">Selected Ticker: <span className="font-semibold">{ticker}</span></h1>

      {loading && <p className="text-gray-400 animate-pulse">Loading instrument...</p>}

      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {portfolioItem && (
        <div className="w-full max-w-2xl mb-8">
          <PortfolioCard item={portfolioItem} focusPage={true} />
        </div>
      )}

      {portfolioItem && (
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Sell Shares</h2>
          <form onSubmit={handleSell} className="flex gap-4 items-center">
            <input
              type="number"
              min="1"
              value={sellShares}
              onChange={(e) => setSellShares(Number(e.target.value))}
              className="border p-2 text-black rounded w-48"
              placeholder="Shares to sell"
              disabled={selling}
            />
            <button
              type="submit"
              className={`p-2 rounded ${selling ? "bg-gray-400" : "bg-red-600"}`}
              disabled={selling}
            >
              {selling ? "Selling..." : "Sell Shares"}
            </button>
          </form>

          {sellError && (
            <div className="bg-red-600 text-white px-4 py-2 rounded mt-4">
              {sellError}
            </div>
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-1"
            >
              <p>Date: <span className="font-semibold">{new Date(transaction.date).toLocaleDateString()}</span></p>
              <p>Operation: <span className="font-semibold">{transaction.operation}</span></p>
              <p>Shares Traded: <span className="font-semibold">{transaction.sharesTraded}</span></p>
              <p>Transaction Value: <span className="font-semibold">${transaction.value.toLocaleString()}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
