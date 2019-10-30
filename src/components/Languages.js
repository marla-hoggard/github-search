import React from 'react';

const Languages = ({ languages }) => {
  const totalBytes = languages.reduce((tally, cur) => tally + cur.size, 0);
  const percent = amt => {
    const pct = Math.round(amt / totalBytes * 1000) / 10;
    return `${pct}%`;
  }
  return (
    <ul>
      <span className="bold underline">Languages:</span>
      {languages.sort((a, b) => b.size - a.size).map(lang => (
        <li key={lang.node.name}>
          {lang.node.name} ({percent(lang.size)})
        </li>
      ))}
    </ul>
  );
};

export default Languages;