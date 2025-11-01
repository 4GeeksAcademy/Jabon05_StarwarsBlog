import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { type, uid } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then((res) => res.json())
      .then((data) => setDetail(data.result))
      .catch((err) => console.error(err));
  }, [type, uid]);

  if (!detail || !detail.properties) {
    return <p className="text-center mt-5">Cargando!!</p>;
  }

  const imgUrl = `https://w7.pngwing.com/pngs/109/654/png-transparent-logo-star-wars-silhouette-star-wars-logo-text-logo-silhouette.png`;

  return (
    <div className="text-center mt-4">
      <h1 className="text-warning">{detail.properties.name}</h1>
      <img
        src={imgUrl}
        alt={detail.properties.name}
        className="img-fluid mb-3"
        onError={(e) =>
          (e.target.src = "https://w7.pngwing.com/pngs/109/654/png-transparent-logo-star-wars-silhouette-star-wars-logo-text-logo-silhouette.png")
        }
      />
      <div className="card p-3 bg-dark text-light text-start">
        {Object.entries(detail.properties).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailView;