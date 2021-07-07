import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Products from "./Products";
import products from "../data/products.json";
import users from "../data/names.json";

const StyledContainer = styled.div`
  padding: 1rem;
  text-align: left;
`;

const StyledDiv = styled.div`
  padding: 1rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UsersList = ({ selectedUser, onSelectUser }: props) => {
  return (
    <StyledDiv>
      <select value={selectedUser.id} onChange={onSelectUser}>
        {users.map((user) => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
    </StyledDiv>
  );
};

const AddNewProduct = () => {
  let history = useHistory();

  const onAddNewProduct = () => {
    history.push("/add");
  };
  return (
    <StyledDiv>
      <button onClick={onAddNewProduct}>Add New Product</button>
    </StyledDiv>
  );
};

const SearchProducts = ({ searchProduct, onSearchProduct }: props) => {
  return (
    <StyledDiv>
      <label>Search Product:</label>
      {"    "}
      <input type="text" value={searchProduct} onChange={onSearchProduct} />
    </StyledDiv>
  );
};

const Home = () => {
  const [productList, setProductList] = useState(products);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const onSelectUser = (e) => {
    const selectedUser = users.find(
      (user) => user.id.toString() === e.target.value
    );
    setSelectedUser(selectedUser);
  };

  const onSearchProduct = (e) => {
    setSearchProduct(e.target.value);
    let searchedProducts = products.filter((p) =>
      p.productName.toLowerCase().includes(e.target.value)
    );
    setProductList(searchedProducts);
  };

  const onDeleteProduct = (id) => {
    const matchingProduct = productList.find((p) => p.productId === id);
    if (
      window.confirm(
        "Are you sure to delete product: " + matchingProduct.productName + "?"
      )
    ) {
      let newProductList = productList.filter((p) => p !== matchingProduct);
      setProductList(newProductList);
    }
  };

  return (
    <StyledContainer className="container-fluid">
      <UsersList selectedUser={selectedUser} onSelectUser={onSelectUser} />
      <FlexBox>
        <SearchProducts
          searchProduct={searchProduct}
          onSearchProduct={onSearchProduct}
        />
        {selectedUser.seller && <AddNewProduct />}
      </FlexBox>
      <Products
        products={productList}
        onDeleteProduct={onDeleteProduct}
        user={selectedUser}
      />
    </StyledContainer>
  );
};

export default Home;
