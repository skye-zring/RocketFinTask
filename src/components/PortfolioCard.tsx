import { Link } from "react-router-dom";
import { PortfolioItem } from "../types/PortfolioItem";

interface PortfolioCardProps {
  item: PortfolioItem;
  focusPage?: boolean;
}

export default function PortfolioCard({ item, focusPage = false }: PortfolioCardProps) {
  const CardContent = () => (
    <div className={`${focusPage ? "" : "bg-gray-800"} p-4 rounded-lg shadow-md w-full ${!focusPage ? "max-w-[300px]" : ""}`}>
      <h2 className="text-xl font-bold mb-2">{item.ticker}</h2>
      <p className="text-lg italic mb-2">{item.shortName}</p>

      <p>
        Cost Basis:{" "}
        <span className="font-semibold">
          ${item.costBasis.toLocaleString()}
        </span>
      </p>

      <p>
        Market Value:{" "}
        <span className="font-semibold">
          ${item.marketValue.toLocaleString()}
        </span>
      </p>

      <p>
        Unrealized P/L:{" "}
        <span
          className={`font-semibold ${
            item.unrealizedProfitLoss >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {item.unrealizedProfitLoss >= 0 ? "+" : ""}
          ${item.unrealizedProfitLoss.toLocaleString()}
        </span>
      </p>

      <p>
        Return Rate:{" "}
        <span
          className={`font-semibold ${
            item.unrealizedReturnRate >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {item.unrealizedReturnRate.toFixed(2)}%
        </span>
      </p>

      <p>
        Total Shares:{" "}
        <span className="font-semibold">
          {item.totalShares}
        </span>
      </p>
    </div>
  );

  return (
    focusPage ? (
      <CardContent />
    ) : (
      <Link to={`/instrument/${item.ticker}`}>
        <CardContent />
      </Link>
    )
  );
}