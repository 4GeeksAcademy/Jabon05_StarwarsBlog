import React from "react";
import { useAppContext } from "../Context/context";
import {Cards} from "../Components/Cards";

const Home = () => {
  const { state } = useAppContext();

return (
    <div className="container mt-4">
      <h2 className="text-warning mb-3">Personajes</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-4">
        {state.people.length > 0 ? (
          state.people.map((item) => (
            <Cards key={item.uid} item={item} type="people" />
          ))
        ) : (
          <p className="text-muted">Cargando personajes...</p>
        )}
      </div>

      <h2 className="text-warning mb-3">Planetas</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-4">
        {state.planets.length > 0 ? (
          state.planets.map((item) => (
            <Cards key={item.uid} item={item} type="planets" />
          ))
        ) : (
          <p className="text-muted">Cargando planetas...</p>
        )}
      </div>

      <h2 className="text-warning mb-3">Vehículos</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-4">
        {state.vehicles.length > 0 ? (
          state.vehicles.map((item) => (
            <Cards key={item.uid} item={item} type="vehicles" />
          ))
        ) : (
          <p className="text-muted">Cargando vehículos...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
