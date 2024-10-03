import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdCardProps } from "../components/RecentAds";
import axios from "axios";
import AdCard from "../components/AdCard";

function AdsByCategory() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResult = await axios.get(
          `http://localhost:3000/ads?category=${id}`
        );
        setAds(fetchResult.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  return ads.length === 0 ? (
    <h2>Aucune anonce corrrespondante trouvée</h2>
  ) : (
    <>
      <h2 className="page-title">
        Annonces de la catégorie {ads[0].category?.name}
      </h2>
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
}

export default AdsByCategory;
