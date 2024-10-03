import { Link, useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useEffect, useState } from "react";
import { AdCardProps } from "../components/RecentAds";
import axios from "axios";

function SearchResults() {
  const [total, setTotal] = useState(0);
  const [searchedAds, setSearchedAds] = useState([] as AdCardProps[]);
  const { keyword } = useParams();

  useEffect(() => {
    const sendSearch = async () => {
      try {
        const results = await axios.get(
          `http://localhost:3000/ads?search=${keyword}`
        );
        setSearchedAds(results.data);
      } catch (err) {
        console.error(err);
      }
    };
    sendSearch();
  }, [keyword]);

  console.log(searchedAds);

  return (
    <>
      <h2 className="page-title">Résultats de la recherche pour: {keyword} </h2>
      <p>Prix total: {total} </p>
      <section className="recent-ads">
        {searchedAds.map((ad) => (
          <Link key={ad.id} to={`/ad/${ad.id}`}>
            <div>
              <AdCard title={ad.title} imgUrl={ad.picture} price={ad.price} />
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

export default SearchResults;
