import React from 'react';

const HighlightedText = ({ text, searchTerm }) => {
  if (!searchTerm) {
    return <p>{text}</p>;
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <p className="">
      {parts.map((part, index) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <strong className="font-bold text-amber-500" key={index}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
};

export default HighlightedText;
