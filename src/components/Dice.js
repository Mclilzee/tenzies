import React from "react";

export default function Dice(props) {

    function handleButtonClick() {
        props.selectDice(props.index);

    }

    return (
        <div className={`dice ${props.isSelected ? "selected" : ""}`} onClick={handleButtonClick}>{props.number}</div>
    )
}