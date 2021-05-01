import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import "./Main.css";

import api from "../services/api";

import itsamatch from "../assets/itsamatch.png";
import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

const Main = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await api.get("devs", {
        headers: {
          user: id,
        },
      });

      setUsers(response.data);
    })();
  }, [id]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL, { query: { user: id } });

    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [id]);

  const handleLike = async devId => {
    await api.post(`/devs/${devId}/likes`, null, { headers: { user: id } });

    setUsers(userState => {
      return userState.filter(user => user._id !== devId);
    });
  };

  const handleDislike = async devId => {
    await api.post(`/devs/${devId}/dislikes`, null, { headers: { user: id } });

    setUsers(userState => {
      return userState.filter(user => user._id !== devId);
    });
  };

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />

              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a Match" />
          <img className="avatar" src={matchDev.avatar} alt="Dev" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
