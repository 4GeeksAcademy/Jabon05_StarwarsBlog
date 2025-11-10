import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/context";

export const Cards = ({ item, type }) => {
  const { dispatch, state } = useAppContext();
  const navigate = useNavigate();

  const isFavorite = state.favorites.some((favorite) => favorite.uid === item.uid && favorite.type === type);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: {uid: item.uid, type}});
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { ...item, type } });
    }
  };

  return (
    <div className="card bg-black text-light" style={{ minWidth: "18rem" }}>
      <div
        className="card-img-top placeholder-glow bg-secondary d-flex align-items-center justify-content-center"
        style={{ height: "200px" }}
      >
        <span className="placeholder col-6 bg-light text-dark fw-bold text-center rounded">
          Imagen
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate(`/detail/${type}/${item.uid}`)}
          >
            Ver más
          </button>
          <button
            className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
            onClick={handleFavorite}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

