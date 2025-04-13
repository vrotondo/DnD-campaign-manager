import { useState } from 'react';
import './CombatTracker.css';

const CombatTracker = ({ character }) => {
    const [combatants, setCombatants] = useState([
        { id: 1, name: character ? character.class : 'Player Character', initiative: 0, hp: 20, maxHp: 20, isPlayer: true },
    ]);
    const [newCombatant, setNewCombatant] = useState({ name: '', initiative: 0, hp: 10, maxHp: 10 });
    const [activeCombatant, setActiveCombatant] = useState(0);
    const [isInCombat, setIsInCombat] = useState(false);
    const [round, setRound] = useState(1);

    // Function to roll initiative for all combatants
    const rollInitiativeForAll = () => {
        const updatedCombatants = combatants.map(combatant => {
            // If it's a player character, use their DEX modifier
            let initiativeRoll;
            if (combatant.isPlayer && character) {
                const dexMod = Math.floor((character.stats.Dexterity - 10) / 2);
                initiativeRoll = Math.floor(Math.random() * 20) + 1 + dexMod;
            } else {
                initiativeRoll = Math.floor(Math.random() * 20) + 1;
            }

            return { ...combatant, initiative: initiativeRoll };
        });

        // Sort by initiative (higher first)
        updatedCombatants.sort((a, b) => b.initiative - a.initiative);

        setCombatants(updatedCombatants);
        setActiveCombatant(0);
        setIsInCombat(true);
        setRound(1);
    };

    // Function to handle adding a new combatant
    const handleAddCombatant = () => {
        if (newCombatant.name.trim() === '') return;

        setCombatants([
            ...combatants,
            {
                id: Date.now(),
                name: newCombatant.name,
                initiative: parseInt(newCombatant.initiative) || 0,
                hp: parseInt(newCombatant.hp) || 10,
                maxHp: parseInt(newCombatant.maxHp) || 10,
                isPlayer: false
            }
        ]);

        // Reset new combatant form
        setNewCombatant({ name: '', initiative: 0, hp: 10, maxHp: 10 });
    };

    // Function to remove a combatant
    const handleRemoveCombatant = (id) => {
        setCombatants(combatants.filter(combatant => combatant.id !== id));
    };

    // Function to advance to the next turn
    const nextTurn = () => {
        let nextActive = activeCombatant + 1;

        // If we've gone through all combatants, start a new round
        if (nextActive >= combatants.length) {
            nextActive = 0;
            setRound(round + 1);
        }

        setActiveCombatant(nextActive);
    };

    // Function to handle HP changes
    const handleHpChange = (id, change) => {
        setCombatants(combatants.map(combatant => {
            if (combatant.id === id) {
                const newHp = Math.max(0, Math.min(combatant.hp + change, combatant.maxHp));
                return { ...combatant, hp: newHp };
            }
            return combatant;
        }));
    };

    // Function to end combat
    const endCombat = () => {
        setIsInCombat(false);
        setRound(1);
    };

    return (
        <div className="combat-tracker">
            <h2>Combat Tracker</h2>

            {!isInCombat ? (
                <div className="combat-setup">
                    <div className="combatant-list">
                        <h3>Combatants</h3>
                        <ul>
                            {combatants.map((combatant) => (
                                <li key={combatant.id} className={combatant.isPlayer ? 'player-combatant' : 'npc-combatant'}>
                                    <div className="combatant-info">
                                        <span className="combatant-name">{combatant.name}</span>
                                        <span className="combatant-initiative">Init: {combatant.initiative}</span>
                                        <span className="combatant-hp">
                                            HP: {combatant.hp}/{combatant.maxHp}
                                        </span>
                                    </div>
                                    {!combatant.isPlayer && (
                                        <button
                                            className="remove-combatant-btn"
                                            onClick={() => handleRemoveCombatant(combatant.id)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="add-combatant-form">
                        <h3>Add Combatant</h3>
                        <div className="form-group">
                            <label htmlFor="combatant-name">Name:</label>
                            <input
                                id="combatant-name"
                                type="text"
                                value={newCombatant.name}
                                onChange={(e) => setNewCombatant({ ...newCombatant, name: e.target.value })}
                                placeholder="Goblin, Dragon, etc."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="combatant-initiative">Initiative Bonus:</label>
                                <input
                                    id="combatant-initiative"
                                    type="number"
                                    value={newCombatant.initiative}
                                    onChange={(e) => setNewCombatant({ ...newCombatant, initiative: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="combatant-hp">HP:</label>
                                <input
                                    id="combatant-hp"
                                    type="number"
                                    value={newCombatant.hp}
                                    onChange={(e) => {
                                        const hp = parseInt(e.target.value) || 0;
                                        setNewCombatant({ ...newCombatant, hp, maxHp: hp })
                                    }}
                                    min="1"
                                />
                            </div>
                        </div>

                        <button className="add-combatant-btn" onClick={handleAddCombatant}>
                            Add Combatant
                        </button>
                    </div>

                    <div className="combat-controls">
                        <button className="start-combat-btn" onClick={rollInitiativeForAll}>
                            Roll Initiative & Start Combat
                        </button>
                    </div>
                </div>
            ) : (
                <div className="active-combat">
                    <div className="combat-header">
                        <span className="round-tracker">Round {round}</span>
                        <button className="end-combat-btn" onClick={endCombat}>End Combat</button>
                    </div>

                    <div className="initiative-order">
                        <h3>Initiative Order</h3>
                        <ul>
                            {combatants.map((combatant, index) => (
                                <li
                                    key={combatant.id}
                                    className={`
                    ${index === activeCombatant ? 'active-combatant' : ''}
                    ${combatant.isPlayer ? 'player-combatant' : 'npc-combatant'}
                    ${combatant.hp === 0 ? 'defeated-combatant' : ''}
                  `}
                                >
                                    <div className="combatant-info">
                                        <span className="combatant-name">{combatant.name}</span>
                                        <span className="combatant-initiative">{combatant.initiative}</span>
                                    </div>

                                    <div className="hp-control">
                                        <div className="hp-buttons">
                                            <button onClick={() => handleHpChange(combatant.id, -1)}>-</button>
                                            <span className="hp-display">
                                                <span className="current-hp">{combatant.hp}</span>
                                                <span className="max-hp">/{combatant.maxHp}</span>
                                            </span>
                                            <button onClick={() => handleHpChange(combatant.id, 1)}>+</button>
                                        </div>

                                        <div className="hp-bar-container">
                                            <div
                                                className="hp-bar"
                                                style={{ width: `${(combatant.hp / combatant.maxHp) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="turn-controls">
                        <button className="next-turn-btn" onClick={nextTurn}>
                            Next Turn →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CombatTracker;