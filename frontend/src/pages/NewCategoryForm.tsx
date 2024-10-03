import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewCategoryForm() {
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    axios.post("http://localhost:3000/categories", formJson);
    navigate("/");
  };

  return (
    <div className="new-ad">
      <h2 className="page-title">Nouvelle Catégorie</h2>
      <form className="form" onSubmit={submitForm}>
        <label>Nom de la catégorie:</label>
        <input className="text-field" name="name" />

        <button className="button">Submit</button>
      </form>
    </div>
  );
}

export default NewCategoryForm;
