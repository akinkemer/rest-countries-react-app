import React from "react";
import { BiSort,BiSortAZ,BiSortZA } from "react-icons/bi";
import "../style.css";

function SortingIcon(props) {
  const direction = props.direction;
  if (direction == null) {
    return <BiSort className="mx-2 my-auto sorting-icon" size="1.5em"/>;
  } else if (direction === "ascending") {
    return <BiSortAZ className="mx-2 my-auto sorting-icon" size="1.5em"/>;
  } else {
    return <BiSortZA className="mx-2 my-auto sorting-icon" size="1.5em" />;
  }
}
export default SortingIcon;
