import React from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
  }, []);
}
