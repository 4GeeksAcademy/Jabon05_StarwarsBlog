import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  favorites: [],
  people: [],
  planets: [],
  vehicles: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.payload.type]: action.payload.results };

    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.uid !== action.payload.uid
        ),
      };

    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async (type) => {
  try {
        const res = await fetch(`https://www.swapi.tech/api/${type}`);
        const data = await res.json();
        dispatch({ type: "SET_DATA", payload: { type, results: data.results } });
      } catch (err) {
        console.error(`Error fetching ${type}:`, err);
      }
    };

    fetchData("people");
    fetchData("planets");
    fetchData("vehicles");
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
