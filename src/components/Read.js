import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container p-5">
      <p>{data.id}</p>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Read;
