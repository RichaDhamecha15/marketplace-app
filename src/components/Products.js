import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const StyledTable = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    td {
      :first-child {
        text-align: center;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data, update, products, deleteProduct, user }) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  React.useEffect(() => {
    console.log("sort");
  }, [sortBy]);

  // Render the UI for your table
  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={rows.length <= products.length}
      loader={<h4>Loading more 5 items...</h4>}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log("cell", row, cell, i, cell.getCellProps());
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <Link to={"/view/" + row.original.productId}>View</Link>
                  {user.seller && (
                    <>
                      {" "}
                      |{" "}
                      <Link to={"/edit/" + row.original.productId}>
                        Edit{" "}
                      </Link>|{" "}
                      <span
                        style={{ color: "#007bff", cursor: "pointer" }}
                        onClick={() => deleteProduct(row.original.productId)}
                      >
                        {" "}
                        Remove
                      </span>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

const Products = ({ products, onDeleteProduct, user }: props) => {
  const [items, setItems] = useState(products.slice(0, 15));

  useEffect(() => {
    setItems(products.slice(0, 15));
  }, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Details",
        columns: [
          {
            Header: "Product Image",
            accessor: "productImage",
            Cell: (props) => (
              <img
                alt="product"
                align="center"
                src={props.value}
                width="80"
                height="80"
              />
            ),
          },
          {
            Header: "Product Name",
            accessor: "productName",
          },
          {
            Header: "Product Category",
            accessor: "productCategory",
          },
        ],
      },
      {
        Header: "Price",
        columns: [
          {
            Header: "Product Price",
            accessor: "productPrice",
          },
          {
            Header: "Sale Price",
            accessor: "salePrice",
          },
        ],
      },
    ],
    []
  );

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(products.slice(items.length, items.length + 5)));
    }, 1500);
  };

  const data = React.useMemo(() => items, [items]);

  return (
    <StyledTable>
      <Table
        columns={columns}
        data={data}
        update={fetchMoreData}
        products={products}
        deleteProduct={onDeleteProduct}
        user={user}
      />
    </StyledTable>
  );
};

export default Products;
