import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdCardProps } from "../components/RecentAds";
import { Category } from "../components/Header";

function EditAd() {
  const { id } = useParams();
  const [ad, setAd] = useState({} as AdCardProps);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const fetchResult = await axios.get(`http://localhost:3000/ads/${id}`);
        setAd(fetchResult.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const fetchResult = await axios.get(`http://localhost:3000/categories`);
        setCategories(fetchResult.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCategories();
    fetchAd();
  }, [id]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    await axios.put(`http://localhost:3000/ads/${id}`, formJson);
    navigate(`/ad/${id}`);
  };

  if (ad) {
    return (
      <div className="new-ad">
        <h2 className="page-title">Edit Ad: </h2>
        <form className="form" onSubmit={submitForm}>
          <label>Titre de l'annonce:</label>
          <input className="text-field" name="title" defaultValue={ad.title} />
          <label>Description:</label>
          <input
            className="text-field"
            name="description"
            defaultValue={ad.description}
          />
          <label>Vendeur:</label>
          <input className="text-field" name="owner" defaultValue={ad.owner} />
          <label>Photo:</label>
          <input
            className="text-field"
            name="picture"
            defaultValue={ad.picture}
          />
          <label>Prix:</label>
          <input
            className="text-field"
            type="number"
            name="price"
            defaultValue={ad.price}
          />
          <label>Ville:</label>
          <input
            className="text-field"
            name="location"
            defaultValue={ad.location}
          />
          <label>Date:</label>
          <input
            className="text-field"
            type="date"
            name="createdAt"
            defaultValue={ad.createdAt?.split("T")[0]}
          />
          <select name="category" defaultValue={ad.category?.id}>
            {categories.map((category) => (
              <option
                value={category.id}
                key={category.id}
                className="text-field"
              >
                {category.name}
              </option>
            ))}
          </select>
          <button className="button">Submit</button>
        </form>
      </div>
    );
  } else return <h2>Loading</h2>;
}

export default EditAd;
