import "./Login.css";

import logo from "../assets/logo.svg";

const Login = () => {
  return (
    <div className="login-container">
      <form>
        <img src={logo} alt="Tindev" />
        <input type="text" placeholder="Digite seu usuário no Github" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
