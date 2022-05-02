import React from "react";
import Dice from "./Dice"

export default function Main(props) {

    const [diceStates, setDiceStates] = React.useState(() => {
        return createTable(10)
    })

    function generateRandomNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function selectDice(index) {

        setDiceStates(prevArray => {
            const newArray = [...prevArray];
            console.log(newArray)
            newArray[index].isSelected = !prevArray[index].isSelected;
            return newArray;
        })
    }

    function rollDice() {
        setDiceStates(prevArray => {
            return prevArray.map(dice => {
                return dice.isSelected ? {...dice} :
                    {...dice, number: generateRandomNumber()}
            })
        })
    }

    function createTable(size) {
        const table = []
        for (let i = 0; i < size; i++) {
            const dice = {
                number: generateRandomNumber(),
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

    function checkIfGameOver() {
        for (let i = 0; i < diceStates.length - 1; i++) {
            if (diceStates[i].number !== diceStates[i + 1]) {
                return false;
            }
        }

        return true;
    }

    const isGameOver = checkIfGameOver();

    return (
        <div>
            <div className="diceContainer">
                {diceTable}
            </div>
            <button onClick={rollDice}>{isGameOver ? "Reset Game" : "Roll"}</button>

        </div>
    )
}