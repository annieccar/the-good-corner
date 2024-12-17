import { useParams } from "react-router-dom";
import AdForm from "../components/AdForm";

function EditAdForm() {
  const { id } = useParams();

  return <AdForm id={id} formType="editAd" />;
}

export default EditAdForm;
