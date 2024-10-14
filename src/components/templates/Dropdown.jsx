import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
