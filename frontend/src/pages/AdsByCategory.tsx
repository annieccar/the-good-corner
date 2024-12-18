import { useState } from "react";
import { useParams } from "react-router-dom";

import AdCard from "../components/AdCard";
import { useAllAdsByCategoryQuery } from "../generated/graphql-types";

function AdsByCategory() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);

  const { loading, error, data } = useAllAdsByCategoryQuery({
    variables: {
      category: parseFloat(id!),
    },
    skip: !id,
  });

  const ads = data?.AllAdsByCategory;
  console.log(ads);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (ads) {
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
            <AdCard
              id={ad.id}
              title={ad.title}
              pictures={ad.pictures}
              price={ad.price}
              setTotal={setTotal}
              total={total}
            />
          ))}
        </section>
      </>
    );
  }
}

export default AdsByCategory;
