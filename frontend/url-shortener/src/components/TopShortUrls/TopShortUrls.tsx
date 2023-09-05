import React from "react";
import { shortUrl } from "../../App";
import "./TopShortUrl.css";

interface TopShortUrlsProps {
  shortUrls: shortUrl[];
}

export const TopShortUrls: React.FC<TopShortUrlsProps> = ({ shortUrls }) => {
  const backendUrl = "http://localhost:8080";
  return (
    <table aria-label="Top Urls" className="top-short-url-container">
      <thead>
        <tr>
          <th colSpan={3} className="top-short-url-title">
            Top Urls
          </th>
        </tr>
        <tr className="table-titles">
          <th>Short:</th>
          <th>Full Url:</th>
          <th>Times clicked:</th>
        </tr>
      </thead>
      <tbody>
        {shortUrls.map((short) => (
          <tr className="data-row" key={short.id}>
            <td>
              <a href={`${backendUrl}/${short.short}`}>{short.short}</a>
            </td>
            <td>
              <a href={short.full_url}>{short.full_url}</a>
            </td>
            <td>{short.num_clicked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
