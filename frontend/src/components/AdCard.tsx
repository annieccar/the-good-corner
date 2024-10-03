import { AdCardProps } from "./RecentAds";

const AdCard = ({ title, price, picture }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <div className="ad-card-link">
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title"> {title} </div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
