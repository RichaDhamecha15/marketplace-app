import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import products from "../data/products.json";

const StyledContainer = styled.div`
  padding: 1rem;
  text-align: left;
`;

const StyledDiv = styled.div`
  padding: 1rem;
`;

const ViewProductDetails = () => {
  let history = useHistory();
  const { id } = useParams();
  const product = products.find((p) => p.productId.toString() === id);
  if(!product) return <div>Loading...</div>

  const onBack = () => {
    history.push("/");
  };
  return (
    <StyledContainer>
      <StyledDiv><button onClick={onBack}>Back</button></StyledDiv>
      <div className="row">
        <div className="col-md-4">
        <img src={product.productImage} alt={product.productName} height="250"/>
        </div>
        <div className="col-md-8">
          <h4>{product.productName}</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            ${product.salePrice.toFixed(2)}
          </p>
        </div>
      </div>    
  </StyledContainer>
  );
};

export default ViewProductDetails;
