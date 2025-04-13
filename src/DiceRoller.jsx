import { useState } from 'react';
import './DiceRoller.css';

const DiceRoller = () => {
    const [numberOfDice, setNumberOfDice] = useState(1);
    const [diceType, setDiceType] = useState(20);
    const [modifier, setModifier] = useState(0);
    const [rollResults, setRollResults] = useState(null);
    const [rollHistory, setRollHistory] = useState([]);
    const [isRolling, setIsRolling] = useState(false);

    // Available dice types in D&D
    const diceTypes = [4, 6, 8, 10, 12, 20, 100];

    // Function to roll dice
    const rollDice = () => {
        setIsRolling(true);

        // Simulate rolling animation
        setTimeout(() => {
            let results = [];
            let total = 0;

            // Roll each die
            for (let i = 0; i < numberOfDice; i++) {
                const roll = Math.floor(Math.random() * diceType) + 1;
                results.push(roll);
                total += roll;
            }

            // Add modifier to total
            const finalTotal = total + parseInt(modifier);

            // Format the roll for display
            const rollDisplay = {
                dice: `${numberOfDice}d${diceType}`,
                results: results,
                modifier: parseInt(modifier),
                total: finalTotal,
                timestamp: new Date().toLocaleTimeString()
            };

            setRollResults(rollDisplay);
            setRollHistory([rollDisplay, ...rollHistory].slice(0, 10));
            setIsRolling(false);
        }, 600);
    };

    // Handle number of dice change
    const handleNumberOfDiceChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 10) {
            setNumberOfDice(value);
        }
    };

    // Handle modifier change
    const handleModifierChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= -20 && value <= 20) {
            setModifier(value);
        }
    };

    // Clear the roll history
    const clearHistory = () => {
        setRollHistory([]);
    };

    // Render dice icons based on results
    const renderDiceIcons = () => {
        if (!rollResults) return null;

        return (
            <div className="dice-results-icons">
                {rollResults.results.map((result, index) => (
                    <div key={index} className={`dice-icon d${diceType}`}>
                        <span>{result}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="dice-roller">
            <h2>Dice Roller</h2>

            <div className="dice-roller-content">
                <div className="dice-controls">
                    <div className="dice-selection">
                        <div className="form-group">
                            <label htmlFor="number-of-dice">Number of Dice:</label>
                            <input
                                id="number-of-dice"
                                type="number"
                                value={numberOfDice}
                                onChange={handleNumberOfDiceChange}
                                min="1"
                                max="10"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dice-type">Dice Type:</label>
                            <select
                                id="dice-type"
                                value={diceType}
                                onChange={(e) => setDiceType(parseInt(e.target.value))}
                            >
                                {diceTypes.map(type => (
                                    <option key={type} value={type}>d{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="modifier">Modifier:</label>
                            <input
                                id="modifier"
                                type="number"
                                value={modifier}
                                onChange={handleModifierChange}
                                min="-20"
                                max="20"
                            />
                        </div>
                    </div>

                    <button
                        className={`roll-button ${isRolling ? 'rolling' : ''}`}
                        onClick={rollDice}
                        disabled={isRolling}
                    >
                        {isRolling ? 'Rolling...' : `Roll ${numberOfDice}d${diceType}${modifier >= 0 ? '+' + modifier : modifier}`}
                    </button>
                </div>

                <div className="dice-results">
                    {renderDiceIcons()}

                    {rollResults && (
                        <div className="roll-details">
                            <div className="roll-formula">
                                {rollResults.dice}
                                {rollResults.modifier !== 0 && (
                                    <span className="roll-modifier">
                                        {rollResults.modifier > 0 ? ' + ' : ' - '}
                                        {Math.abs(rollResults.modifier)}
                                    </span>
                                )}
                            </div>

                            <div className="roll-breakdown">
                                {rollResults.results.join(' + ')}
                                {rollResults.modifier !== 0 && (
                                    <span>
                                        {rollResults.modifier > 0 ? ' + ' : ' - '}
                                        {Math.abs(rollResults.modifier)}
                                    </span>
                                )}

                                <span className="roll-equals"> = </span>
                                <span className="roll-total">{rollResults.total}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="roll-history">
                    <div className="history-header">
                        <h3>Roll History</h3>
                        {rollHistory.length > 0 && (
                            <button className="clear-history-btn" onClick={clearHistory}>
                                Clear
                            </button>
                        )}
                    </div>

                    {rollHistory.length === 0 ? (
                        <p className="history-empty">No rolls yet</p>
                    ) : (
                        <ul className="history-list">
                            {rollHistory.map((roll, index) => (
                                <li key={index} className="history-item">
                                    <span className="history-time">{roll.timestamp}</span>
                                    <span className="history-formula">
                                        {roll.dice}
                                        {roll.modifier !== 0 && (
                                            <span>
                                                {roll.modifier > 0 ? ' + ' : ' - '}
                                                {Math.abs(roll.modifier)}
                                            </span>
                                        )}
                                    </span>
                                    <span className="history-total">{roll.total}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiceRoller;