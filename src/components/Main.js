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
            return prevArray.map((diceItem, diceIndex) => {
                return diceIndex === index ? {...diceItem, isSelected: !diceItem.isSelected} :
                    {...diceItem}
            })
        })
    }

    function rollDice() {

        if (isGameOver()) {
            setDiceStates(createTable(10));
            return;
        }

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

    function isGameOver() {
        for (let i = 0; i < diceStates.length - 1; i++) {
            if (diceStates[i].number !== diceStates[i + 1].number) {
                return false;
            }
        }
        return true;
    }

    return (
        <div>
            <div className="diceContainer">
                {diceTable}
            </div>
            <button onClick={rollDice}>{isGameOver() ? "Reset" : "Roll"}</button>

        </div>
    )
}