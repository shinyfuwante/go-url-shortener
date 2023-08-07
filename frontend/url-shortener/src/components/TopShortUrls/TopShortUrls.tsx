import React from "react";
import { shortUrl } from "../../App";
import "./TopShortUrl.css";

interface TopShortUrlsProps {
  shortUrls: shortUrl[];
}

export const TopShortUrls: React.FC<TopShortUrlsProps> = ({ shortUrls }) => {
  return (
    <div className="top-short-url-container">
      {shortUrls.map((short) => (
        <div key={short.id}>
          {short.short}
          -----------------
          {short.full_url}
          *---------------*
        </div>
      ))}
    </div>
  );
};
