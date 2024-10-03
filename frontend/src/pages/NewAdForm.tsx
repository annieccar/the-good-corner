// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type category = {
  id: number;
  name: string;
};

function NewAdForm() {
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const results = await axios.get("http://localhost:3000/categories");
        setCategories(results.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    axios.post("http://localhost:3000/ads", formJson);
  };

  return (
    <div className="new-ad">
      <h2 className="page-title">Nouvelle Annonce</h2>
      <form className="form" onSubmit={submitForm}>
        <label>Titre de l'annonce:</label>
        <input className="text-field" name="title" />
        <label>Description:</label>
        <input className="text-field" name="description" />
        <label>Vendeur:</label>
        <input className="text-field" name="owner" />
        <label>Photo:</label>
        <input className="text-field" name="picture" />
        <label>Prix:</label>
        <input className="text-field" type="number" name="price" />
        <label>Ville:</label>
        <input className="text-field" name="location" />
        <label>Date:</label>
        <input className="text-field" type="date" name="createdAt" />
        <select name="category">
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
}

export default NewAdForm;
