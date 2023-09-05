import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
  }, []);
}

export default NotFound;
