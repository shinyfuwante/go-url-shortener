import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../App";
import { backendResponse } from "../../App";
export default function RedirectUrl() {
  const { short } = useParams();
  const fetchFromBE = async (): Promise<backendResponse> => {
    const res = await fetch(backendUrl + short);
    return await res.json();
  };
  const redirect = async () => {
    const data = await fetchFromBE();
    console.log(data.data.fullUrl);
    window.location.href = data.data.fullUrl;
  };
  useEffect(() => {
    redirect();
  });
  return <div>Redirecting...</div>;
}
