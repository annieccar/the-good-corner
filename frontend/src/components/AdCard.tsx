import { Link } from "react-router-dom";
import { AdCardProps } from "./RecentAds";

const AdCard = ({
  title,
  price,
  pictures,
  id,
  total,
  setTotal,
}: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ad/${id}`}>
        {pictures.length > 0 && (
          <img className="ad-card-image" src={pictures[0]?.url} />
        )}
        <div className="ad-card-text">
          <div className="ad-card-title"> {title} </div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>

      <button className="button" onClick={() => setTotal(total + price)}>
        Add price to total
      </button>
    </div>
  );
};

export default AdCard;
