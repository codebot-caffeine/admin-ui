import React from "react";
import "./index.css";

const Pagination = ({ data, pageHandler }) => {
  let PageNumbers = [];

  for (let index = 1; index < Math.ceil(data.length / 10) + 1; index++) {
    PageNumbers.push(index);
  }

  return (
    <div>
      <center className="display-setter">
        {PageNumbers.map((eachPage) => (
          <div
            className="pageButton"
            onClick={() => {
              pageHandler(eachPage);
            }}
          >
            {eachPage}
          </div>
        ))}
      </center>
    </div>
  );
};

export default Pagination;
