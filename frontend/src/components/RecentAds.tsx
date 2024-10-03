import { useState, useEffect } from "react";
import AdCard from "./AdCard";
import axios from "axios";
import { Link } from "react-router-dom";

export interface AdCardProps {
  createdAt?: string;
  location?: string;
  owner?: string;
  description?: string;
  id?: number;
  title: string;
  picture: string;
  price: number;
  category?: {
    id: number;
    name: string;
  };
}

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResult = await axios.get("http://localhost:3000/ads");
        setAds(fetchResult.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="page-title">Annonces récentes</h2>
      <p>Prix total: {total} </p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <Link key={ad.id} to={`/ad/${ad.id}`}>
            <div>
              <AdCard title={ad.title} picture={ad.picture} price={ad.price} />
              <button
                className="button"
                onClick={() => setTotal(total + ad.price)}
              >
                Add price to total
              </button>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
