import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../gestorProdutos/NavbarGestor";
import Header from "../components/Header";
import "../Css/style.css"; // Importe seu arquivo de estilos CSS aqui

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Maximum products per page
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/compra/lista-compra"
        );
        setCompras(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total number of products
    const total = products.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalProducts(total);
  }, [products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle sorting
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  // Sort products based on current sort column and order
  let sortedProducts = [...currentProducts];
  if (sortColumn) {
    sortedProducts.sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
      if (columnA < columnB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleActionChange = (id, action) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, action } : product
      )
    );
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-layout">
      <Navbar /> {/* Adiciona a navbar */}
      <Header /> {/* Adiciona o header */}
      <div className="produtos-background">
            
      <h1 className="titleh1">Meus Produtos ({compras.length})</h1>
      <table className="table">
        <thead>
          <tr className="subtitles">
            <th onClick={() => handleSort("name")}>
              PRODUTO{" "}
              {sortColumn === "name" && (
                <i
                  className={`bi bi-caret-${
                    sortOrder === "asc" ? "up" : "down"
                  }-fill`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("quantity")}>
              LICENÇAS{" "}
              {sortColumn === "quantity" && (
                <i
                  className={`bi bi-caret-${
                    sortOrder === "asc" ? "up" : "down"
                  }-fill`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("lastSession")}>
              ÚLTIMA SESSÃO{" "}
              {sortColumn === "lastSession" && (
                <i
                  className={`bi bi-caret-${
                    sortOrder === "asc" ? "up" : "down"
                  }-fill`}
                ></i>
              )}
            </th>
            {/* <th>AÇÃO</th> */}
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.idCompra} className="product-row">
              <td className="product-name">
                <div className="product-details">
                  <div className="product-text">{compra.software}</div>
                </div>
              </td>
              <td className="product-quantity">{compra.quantidade}</td>
              <td className="product-lastSession">{compra.data}</td>
              {/* <td className="product-action">
                <select
                  value={compra.action}
                >
                  <option value="install">Instalar</option>
                  <option value="initiate">Iniciar</option>
                  <option value="uninstall">Desinstalar</option>
                </select>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentProducts.length < productsPerPage}
        >
          Next
        </button>
      </div>

      {/* Product counter at bottom right */}
      <div className="product-counter">Total Products: {compras.length}</div>
    </div>
    </div>
  );
}

export default Products;
