import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../App";
export default function RedirectUrl() {
  const { short } = useParams();
  const redirect = async () => {
    console.log(short);
    await fetch(backendUrl + short);
  };
  useEffect(() => {
    redirect();
  }, [short]);
  return <div>Redirecting...</div>;
}
