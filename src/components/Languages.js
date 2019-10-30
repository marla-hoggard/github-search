import React from 'react';

const Languages = ({ languages }) => {
  if (!languages.length) {
    return <div><span className="bold">Languages:</span> None</div>
  }
  const totalBytes = languages.reduce((tally, cur) => tally + cur.size, 0);
  const percent = amt => {
    return Math.round(amt / totalBytes * 1000) / 10;
  }

  return (
    <>
      <div className="bold">Languages:</div>
      <div className="language__bar">
        {languages.sort((a, b) => b.size - a.size).map(lang => (
          <div
            key={lang.node.name}
            className="language__bar-segment"
            title={lang.node.name}
            style={{
              background: lang.node.color,
              flexGrow: percent(lang.size),
            }}
          >
          </div>
        ))}
      </div>
      <ul className="language__list">
        {languages.sort((a, b) => b.size - a.size).map(lang => (
          <li className="language__list-item" key={lang.node.name}>
            <div
              className="language__color-dot"
              style={{ background: lang.node.color }}
            >
            </div>
            <div>{lang.node.name} ({percent(lang.size)}%)</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Languages;