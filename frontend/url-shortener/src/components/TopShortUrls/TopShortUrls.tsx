import React from "react";
import { shortUrl } from "../../App";
import "./TopShortUrl.css";

interface TopShortUrlsProps {
  shortUrls: shortUrl[];
}

export const TopShortUrls: React.FC<TopShortUrlsProps> = ({ shortUrls }) => {
    const backendUrl = "localhost:8080/"
  return (
    <table className="top-short-url-container">
      <tr>
        <th colSpan="3" className="top-short-url-title">Top Urls</th>
      </tr>
      <tr>
        <th>Short:</th>
        <th>Full Url:</th>
        <th>Times visited:</th>
      </tr>
      {shortUrls.map((short) => (
        <tr key={short.id}>
          <td><a href={backendUrl+short.short}>{short.short}</a></td>
          <td><a href={short.full_url}>{short.full_url}</a></td>
          <td>{short.num_clicked}</td>
        </tr>
      ))}
    </table>
  );
};
