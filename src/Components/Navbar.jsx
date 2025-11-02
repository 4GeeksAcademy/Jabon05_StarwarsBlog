import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/context";

const Navbar = () => {
  const { state, dispatch } = useAppContext();

  const deleteFavorites = (favorite) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favorite });
  };

  return (
    <nav className="navbar navbar-black bg-black px-3 sticky-top">
      {/* ✅ Clickable logo that routes to home */}
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          alt="Star Wars Logo"
          height="80"
          className="border border-warning rounded me-2"
          style={{ cursor: "pointer" }}
        />
      </Link>
      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Favoritos ({state?.favorites?.length ?? 0})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {state?.favorites?.length === 0 ? (
            <li className="dropdown-item text-muted">Vacío</li>
          ) : (
            state.favorites.map((favorite) => (
              <li
                key={favorite.uid}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <span>{favorite.name}</span>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => deleteFavorites(favorite)}
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;