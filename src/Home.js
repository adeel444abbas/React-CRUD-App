import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confrim = window.confirm("Are you sure you want to Delete?");
    if (confrim) {
      axios.delete("http://localhost:3030/users/" + id).then((res) => {
        alert("Record is deleted successfully");
        navigate("/");
      });
    }
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">CRUD APP(Create, Read, Update, Delete) </h2>
      <Link to="/Create" className="btn btn-success my-3">
        Create+
      </Link>
      <table className="table text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link to={`/update/${d.id}`} className="btn btn-success">
                  Update
                </Link>
                <button
                  className="btn btn-danger ml-1"
                  onClick={(e) => {
                    handleDelete(d.id);
                  }}
                >
                  Delete
                </button>
                <Link to={`/read/${d.id}`} className="btn btn-primary ml-1">
                  Read
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
