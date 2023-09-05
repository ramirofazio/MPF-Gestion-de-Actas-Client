import React from "react";
import RingLoader from "react-spinners/RingLoader";

export function Fallback() {
  return (
    <div className="flexContainer100x100 flex-col">
      <h2 className="text-principal">Cargando</h2>
      <RingLoader color={"#006473"} size={60} loading={true} />
    </div>
  );
}
