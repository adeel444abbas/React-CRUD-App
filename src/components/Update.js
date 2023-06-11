import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    id: id,
    name: "",
    email: "",
  });

  // To go back to the page
  const navigate = useNavigate();

  //We use to fetch data from the json server
  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Function to hanndle submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put("http://localhost:3030/users/" + id, inputData).then((res) => {
      alert("Data updated successfully");
      navigate("/");
    });
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="myContainer bg-secondary w-50 text-white p-5">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="number"
              name="id"
              className="form-control"
              required
              disabled
              value={inputData.id}
            />
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              required
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
              value={inputData.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
