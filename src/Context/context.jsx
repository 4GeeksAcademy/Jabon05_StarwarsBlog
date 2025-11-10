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

    case "ADD_FAVORITE": {
      const payload = action.payload;
      const exist = state.favorites.some((f) => f.uid === payload.uid && f.type === payload.type);
      if (exist) return state;
      return { ...state, favorites: [...state.favorites, payload] };
    }
    case "REMOVE_FAVORITE": {
      const payload = action.payload;
      const uid = payload.uid ?? payload?.uid;
      const type = payload.type ?? payload?.type; 
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => !(fav.uid === uid && fav.type === type)
        ),
      };
    }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const stored = (() => {
    try {
      const raw = localStorage.getItem("sw_favorites_v1");
      return raw ? JSON.parse(raw) : null;
    } catch (e) { console.error("Error parsing favorites from localStorage", e);
      return null;
    }
  })();

  const [state, dispatch] = useReducer(reducer, {...initialState, favorites: stored ?? initialState.favorites,});

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
