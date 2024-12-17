import { Link, useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useState } from "react";

import { useAllAdsByKeywordQuery } from "../generated/graphql-types";

function SearchResults() {
  const [total, setTotal] = useState(0);

  const { keyword } = useParams();

  const { data, loading, error } = useAllAdsByKeywordQuery({
    variables: {
      keyword: keyword!,
    },
  });

  const searchedAds = data?.AllAdsByKeyword;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h2 className="page-title">Résultats de la recherche pour: {keyword} </h2>
      <p>Prix total: {total} </p>
      <section className="recent-ads">
        {searchedAds &&
          searchedAds.map((ad) => (
            <Link key={ad.id} to={`/ad/${ad.id}`}>
              <div>
                <AdCard
                  title={ad.title}
                  pictures={ad.pictures}
                  price={ad.price}
                  total={total}
                  setTotal={setTotal}
                />
              </div>
            </Link>
          ))}
      </section>
    </>
  );
}

export default SearchResults;
