import React, { useState, useEffect } from "react";
import "./admindashboard.css";
import TableDashboard from "../../components/TableDashboard/TableDashboard";
import { fetchData } from "../../services/fetch";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const data = await fetchData(
          "api/users/getAllUsers",
          "GET",
          null,
          token
        );
        console.log("Fetched data:", data);
        if (data && data.users) {
          setUsers(data.users);
        } else {
          setError("No users found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchData(
        `api/users/removeUser`,
        "DELETE",
        { userId },
        token
      );
      if (response.message === "User removed successfully!") {
        setUsers(users.filter((user) => user._id !== userId)); // Remove from state
      }
    } catch (err) {
      setError(err.message || "Failed to delete user.");
    }
  };

  const handleEdit = async (user) => {
    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);

    if (newName && newEmail) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetchData(
          `api/users/editUser`,
          "PUT",
          { name: newName, email: newEmail },
          token
        );
        if (response.message === "User updated successfully!") {
          setUsers(
            users.map((u) =>
              u._id === user._id ? { ...u, name: newName, email: newEmail } : u
            )
          ); // Update state
        }
      } catch (err) {
        setError(err.message || "Failed to edit user.");
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <section className="admindashboard">
      <div className="container">
        <div className="row">
          <TableDashboard
            rows={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
