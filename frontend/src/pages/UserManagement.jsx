import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // users per page
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchUsers();
  }, [user, page]);

  const fetchUsers = async () => {
    const { data } = await api.get(`/users?page=${page}&limit=${limit}`);
    setUsers(data.users);
    setTotalPages(Math.ceil(data.count / limit));
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const handlePageChange = (p) => setPage(p);

  return (
    <div>
      <h2>Users</h2>
      {user?.role !== "admin" ? (
        <p>Access Denied</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {user?.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  {user?.role === "admin" && (
                    <td>
                      <button onClick={() => deleteUser(u._id)}>Delete</button>
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
