import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActas } from "../redux/actions";

function Show() {
  const dispatch = useDispatch();

  const actas = useSelector((state) => state?.allActas);

  useEffect(() => {
    dispatch(getAllActas());
  }, []);
  console.log(actas);
  return <div></div>;
}

export default Show;
