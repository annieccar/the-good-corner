import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Ad = {
  picture: string;
  description: string;
  owner: string;
  createdAt: string;
  price: number;
};

function AdDetails() {
  const [ad, setAd] = useState({} as Ad);
  const [date, setDate] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResult = await axios.get(`http://localhost:3000/ads/${id}`);
        setAd(fetchResult.data);
        setDate(fetchResult.data.createdAt.split("T")[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  const deleteAd = async () => {
    try {
      await axios.delete(`http://localhost:3000/ads/${id}`);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {!ad ? (
        <h2>No corresponding ads</h2>
      ) : (
        <>
          <h2>Ad details</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              <img className="ad-details-image" src={ad.picture} />
            </div>
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
                onClick={() => navigate(`/ads/edit/${id}`)}
              >
                Edit ad
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default AdDetails;
