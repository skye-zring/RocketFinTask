import { useState, useEffect } from 'react';
import { PortfolioItem } from '../types/PortfolioItem';
import PortfolioCard from '../components/PortfolioCard';

function Home() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError("");

      try {
        //SIMULATING API CALL (i'd use the actual backend if it was available)
        setTimeout(() => {
            const dummyData: PortfolioItem[] = [
                {
                  ticker: "AAPL",
                  shortName: "Apple Inc.",
                  costBasis: 15000,
                  marketValue: 18000,
                  unrealizedReturnRate: 20,
                  unrealizedProfitLoss: 3000,
                  totalShares: 50,
                },
                {
                  ticker: "TSLA",
                  shortName: "Tesla Inc.",
                  costBasis: 10000,
                  marketValue: 12000,
                  unrealizedReturnRate: 20,
                  unrealizedProfitLoss: 2000,
                  totalShares: 20,
                },
                {
                  ticker: "MSFT",
                  shortName: "Microsoft Corporation",
                  costBasis: 20000,
                  marketValue: 19000,
                  unrealizedReturnRate: -5,
                  unrealizedProfitLoss: -1000,
                  totalShares: 60,
                },
                {
                  ticker: "AMZN",
                  shortName: "Amazon.com Inc.",
                  costBasis: 25000,
                  marketValue: 27500,
                  unrealizedReturnRate: 10,
                  unrealizedProfitLoss: 2500,
                  totalShares: 15,
                },
                {
                  ticker: "NVDA",
                  shortName: "NVIDIA Corporation",
                  costBasis: 18000,
                  marketValue: 26000,
                  unrealizedReturnRate: 44.44,
                  unrealizedProfitLoss: 8000,
                  totalShares: 25,
                },
                {
                  ticker: "META",
                  shortName: "Meta Platforms Inc.",
                  costBasis: 12000,
                  marketValue: 10000,
                  unrealizedReturnRate: -16.67,
                  unrealizedProfitLoss: -2000,
                  totalShares: 40,
                },
                {
                  ticker: "GOOGL",
                  shortName: "Alphabet Inc. (Google)",
                  costBasis: 22000,
                  marketValue: 23000,
                  unrealizedReturnRate: 4.55,
                  unrealizedProfitLoss: 1000,
                  totalShares: 12,
                },
                {
                  ticker: "NFLX",
                  shortName: "Netflix Inc.",
                  costBasis: 8000,
                  marketValue: 7000,
                  unrealizedReturnRate: -12.5,
                  unrealizedProfitLoss: -1000,
                  totalShares: 30,
                },
                {
                  ticker: "AMD",
                  shortName: "AMD (Advanced Micro Devices)",
                  costBasis: 9000,
                  marketValue: 10500,
                  unrealizedReturnRate: 16.67,
                  unrealizedProfitLoss: 1500,
                  totalShares: 70,
                },
                {
                  ticker: "PFE",
                  shortName: "Pfizer Inc.",
                  costBasis: 5000,
                  marketValue: 4500,
                  unrealizedReturnRate: -10,
                  unrealizedProfitLoss: -500,
                  totalShares: 100,
                },
              ];
              
              
          setPortfolioItems(dummyData);
          setLoading(false);
        }, 1500); 
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio. Please try again.");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-20 mt-[64px]">
      <p className="text-lg mb-4 text-2xl font-bold">Your Portfolio:</p>

      {loading && <p className="text-gray-400 animate-pulse">Loading portfolio...</p>}

      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

        {!loading && !error && (
            <div className="flex flex-wrap gap-4 w-full max-w-5xl">
                {portfolioItems.map((item, index) => (
                <PortfolioCard key={index} item={item} />
            ))}
        </div>
      )}    
    </div>
  );
}

export default Home;
