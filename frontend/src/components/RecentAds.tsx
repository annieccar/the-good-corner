import { useState } from "react";
import AdCard from "./AdCard";

import { useGetAdsQuery } from "../generated/graphql-types";

export interface AdCardProps {
  createdAt?: string;
  location?: string;
  owner?: string;
  description?: string;
  id?: number;
  title: string;
  pictures: { id: number; url: string }[];
  price: number;
  category?: {
    id: number;
    name: string;
  };
  tags?: { id: number; name: string }[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const RecentAds = () => {
  const { loading, error, data } = useGetAdsQuery();
  const [total, setTotal] = useState(0);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    return (
      <>
        <h2 className="page-title">Annonces récentes</h2>
        <p>Prix total: {total} </p>
        <section className="recent-ads">
          {data.AllAds.map((ad) => (
            <div className="ad-container">
              <AdCard
                id={ad.id}
                title={ad.title}
                pictures={ad.pictures}
                price={ad.price}
                setTotal={setTotal}
                total={total}
              />
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
