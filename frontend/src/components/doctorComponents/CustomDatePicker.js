import React from "react";

const CustomButton = ({ dates = [], onClick }) => {

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const renderButtonText = () => {
    if (dates.length === 0) return "Select Dates";
    return dates.map(date => formatDate(date)).join(", ");

  };

  return (
    <button onClick={onClick}>
      {renderButtonText()}
      {console.log("ettsts")}
    </button>
  );
};

export default CustomButton;