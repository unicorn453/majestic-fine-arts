import React from "react";
import App, { groceries } from "../App";

function List(props) {
  console.log(props);
  return (
    <ul className="list-group">
      Using the map method, render one li element displaying the text property
      of each grocery object. return (
      {props.groceries.map((groceriesObj) => (
        <li className="list-group-item" key={groceriesObj.id}>
          {groceriesObj.name}
          {groceriesObj.purchased}
        </li>
      ))}
      );
    </ul>
  );
}

export default List;
