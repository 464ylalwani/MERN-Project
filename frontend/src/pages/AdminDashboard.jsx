import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axiosInstance";
import Pagination from "../components/Pagination";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchProducts();
  }, [user, page]);

  const fetchProducts = async () => {
    const { data } = await api.get(
      `/products?keyword=${search}&page=${page}&limit=${limit}`
    );
    setProducts(data.products);
    setTotalPages(Math.ceil(data.count / limit));
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const handlePageChange = (p) => setPage(p);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user?.role !== "admin" ? (
        <p>Access Denied</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setPage(1)}>Search</button>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                {user?.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  {user?.role === "admin" && (
                    <td>
                      <button onClick={() => deleteProduct(p._id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
