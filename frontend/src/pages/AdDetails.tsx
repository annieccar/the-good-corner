import { useNavigate, useParams } from "react-router-dom";

import {
  useDeteteAdMutation,
  useGetAdByIdQuery,
} from "../generated/graphql-types";
import EmblaCarousel from "../components/Carousel/EmblaCarousel";
import { GET_ALL_ADS } from "../graphql/queries";

function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseFloat(id!) },
  });

  // ***TO DO Homepage does not refresh after deletion

  const [deteteAdMutation] = useDeteteAdMutation({
    variables: {
      deteteAdId: parseFloat(id!), // value for 'deteteAdId'
    },
    refetchQueries: [GET_ALL_ADS],
    awaitRefetchQueries: true,
  });

  const deleteAd = async () => {
    try {
      const { data: responseData } = await deteteAdMutation();
      console.log("data:", responseData);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const ad = queryData?.getAdById;
  const date = queryData?.getAdById.createdAt;

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error : {queryError.message}</p>;

  if (ad) {
    return (
      <>
        <h2>{ad.title}</h2>
        <section className="ad-details">
          <EmblaCarousel>
            {ad.pictures.map((picture) => (
              <div className="embla__slide" key={picture.id}>
                <img className="ad-details-image" src={picture.url} />
              </div>
            ))}
          </EmblaCarousel>

          <div className="ad-details-info">
            <div className="ad-details-price">{ad.price} €</div>
            <div className="ad-details-description">{ad.description}</div>
            <hr className="separator" />
            <div className="ad-details-owner">
              Ad published by <b>{ad.owner}</b> on {date}.
            </div>
            <a
              href="mailto:serge@serge.com"
              className="button button-primary link-button"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 2.5,
                  fill: "none",
                }}
              >
                <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
              </svg>
              Send email
            </a>
            <button className="button" onClick={() => deleteAd()}>
              Delete this ad
            </button>
            <button
              className="button"
              onClick={() => navigate(`/ads/edit-test-rhf/${id}`)}
            >
              Edit ad
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default AdDetails;
