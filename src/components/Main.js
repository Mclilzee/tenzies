import React from "react";
import Dice from "./Dice"

export default function Main(props) {

    const [diceStates, setDiceStates] = React.useState(() => {
        return createTable(10)
    })

    function generateRandomNumber(number) {
        return Math.floor(Math.random() * number) + 1;
    }

    function selectDice(index) {

        setDiceStates(prevArray => {
           const newArray = [...prevArray];
           newArray[index].isSelected = !prevArray[index].isSelected;
           return newArray;
        })
    }

    function createTable(size) {
        const table = []
        for (let i = 0; i < size; i++) {
            const dice = {
                number: generateRandomNumber(6),
                isSelected: false
            }

            table.push(dice);
        }

        return table;
    }

    const diceTable = diceStates.map((diceItem, index) => {
        return <Dice index={index}
                     key={index}
                     selectDice={selectDice}
                     isSelected={diceItem.isSelected}
                     number={diceItem.number}
        />
    })


    return (
        <div className="diceContainer">
            {diceTable}
        </div>
    )
}