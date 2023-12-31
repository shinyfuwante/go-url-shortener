import React, { useState } from "react";
import { shortUrl, domain } from "../../App";
import "./SubmittedShort.css";
interface SubmittedShortProps {
  submittedShort: shortUrl;
}
export const SubmittedShort: React.FC<SubmittedShortProps> = ({
  submittedShort,
}) => {
  const constructedUrl = `${domain}${submittedShort.short}`;
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(constructedUrl);
    setCopied(true);
  };
  return (
    <div className="submitted-short-container">
      <span>
        {"Your shortened url is:  "}
        <a href={constructedUrl}>{constructedUrl}</a>
      </span>
      {copied ? (
        <div>Copied to Clipboard!</div>
      ) : (
        <button onClick={() => copyToClipboard()}>Copy to Clipboard</button>
      )}
    </div>
  );
};
