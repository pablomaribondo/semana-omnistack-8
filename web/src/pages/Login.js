import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

import api from "../services/api";

import logo from "../assets/logo.svg";

const Login = () => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await api.post("/devs", { username });

    const { _id: id } = response.data;

    history.push(`/dev/${id}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          type="text"
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
