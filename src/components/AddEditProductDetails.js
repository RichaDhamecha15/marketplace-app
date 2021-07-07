import { useParams } from "react-router-dom";

const AddEditProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
      Add / Edit Product details <p>{id}</p>
    </div>
  );
};

export default AddEditProductDetails;
