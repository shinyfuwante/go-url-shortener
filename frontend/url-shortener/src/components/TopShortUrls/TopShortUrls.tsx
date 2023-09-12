import React from "react";
import { shortUrl, backendUrl } from "../../App";
import "./TopShortUrl.css";

interface TopShortUrlsProps {
  shortUrls: shortUrl[];
}

export const TopShortUrls: React.FC<TopShortUrlsProps> = ({ shortUrls }) => {
  return (
    <table aria-label="Top Urls" className="top-short-url-container">
      <colgroup>
        <col className="short_urls"></col>
        <col className="full_urls"></col>
        <col className="times_clicked"></col>
      </colgroup>
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
            <td className="short_urls">
              <a href={`${backendUrl}/${short.short}`}>{"/"+short.short+"/"}</a>
            </td>
            <td className="full_urls">
              <a href={short.full_url}>{short.full_url}</a>
            </td>
            <td className="times_clicked">{short.num_clicked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
