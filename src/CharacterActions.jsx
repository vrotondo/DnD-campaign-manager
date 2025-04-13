import { useState } from 'react';
import './CharacterActions.css';

const CharacterActions = ({ character }) => {
    const [actionResults, setActionResults] = useState(null);
    const [actionHistory, setActionHistory] = useState([]);

    // Function to roll dice
    const rollDice = (sides, numberOfDice = 1) => {
        let results = [];
        let total = 0;

        for (let i = 0; i < numberOfDice; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
            total += roll;
        }

        return { results, total };
    };

    // Calculate ability modifier
    const getAbilityModifier = (abilityScore) => {
        return Math.floor((abilityScore - 10) / 2);
    };

    // Function to handle skill checks
    const performSkillCheck = (skill, abilityScore) => {
        const modifier = getAbilityModifier(abilityScore);
        const { results, total } = rollDice(20);
        const finalResult = total + modifier;

        const newAction = {
            type: 'skill',
            skill,
            roll: results[0],
            modifier,
            total: finalResult,
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to handle attack rolls
    const performAttackRoll = (attackType) => {
        const abilityScore = attackType === 'Melee' ? character.stats.Strength : character.stats.Dexterity;
        const modifier = getAbilityModifier(abilityScore);
        const { results, total } = rollDice(20);
        const finalResult = total + modifier;

        const damageRoll = attackType === 'Melee' ? rollDice(6) : rollDice(8);
        const damageModifier = attackType === 'Melee' ? getAbilityModifier(character.stats.Strength) : getAbilityModifier(character.stats.Dexterity);
        const totalDamage = damageRoll.total + damageModifier;

        const newAction = {
            type: 'attack',
            attackType,
            roll: results[0],
            attackModifier: modifier,
            attackTotal: finalResult,
            damageRoll: damageRoll.results,
            damageModifier,
            totalDamage: totalDamage > 0 ? totalDamage : 1, // Minimum damage of 1
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to handle saving throws
    const performSavingThrow = (ability) => {
        const abilityScore = character.stats[ability];
        const modifier = getAbilityModifier(abilityScore);
        const { results, total } = rollDice(20);
        const finalResult = total + modifier;

        const newAction = {
            type: 'save',
            ability,
            roll: results[0],
            modifier,
            total: finalResult,
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to handle spellcasting
    const castSpell = () => {
        // Determine which ability score to use based on the character's class
        let spellcastingAbility;
        switch (character.class) {
            case 'Wizard':
            case 'Artificer':
                spellcastingAbility = 'Intelligence';
                break;
            case 'Cleric':
            case 'Druid':
            case 'Ranger':
                spellcastingAbility = 'Wisdom';
                break;
            case 'Bard':
            case 'Paladin':
            case 'Sorcerer':
            case 'Warlock':
                spellcastingAbility = 'Charisma';
                break;
            default:
                spellcastingAbility = 'Intelligence';
        }

        const abilityScore = character.stats[spellcastingAbility];
        const modifier = getAbilityModifier(abilityScore);
        const spellDC = 8 + modifier + 2; // Assuming proficiency bonus of 2
        const { results, total } = rollDice(20);
        const spellAttack = total + modifier + 2; // Assuming proficiency bonus of 2

        const newAction = {
            type: 'spell',
            ability: spellcastingAbility,
            spellDC,
            spellAttackRoll: results[0],
            spellAttackBonus: modifier + 2,
            spellAttackTotal: spellAttack,
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to handle short rest
    const takeShortRest = () => {
        const hitDiceRoll = rollDice(10); // Assuming d10 hit dice for simplicity
        const conModifier = getAbilityModifier(character.stats.Constitution);
        const healingAmount = hitDiceRoll.total + conModifier;

        const newAction = {
            type: 'shortRest',
            hitDiceRoll: hitDiceRoll.results[0],
            conModifier,
            healingAmount: healingAmount > 0 ? healingAmount : 1, // Minimum of 1 HP
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to handle long rest
    const takeLongRest = () => {
        const newAction = {
            type: 'longRest',
            message: 'You take a long rest and recover all hit points, half your hit dice, and all spell slots.',
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Function to show custom dice roll modal
    const rollInitiative = () => {
        const dexModifier = getAbilityModifier(character.stats.Dexterity);
        const { results, total } = rollDice(20);
        const finalResult = total + dexModifier;

        const newAction = {
            type: 'initiative',
            roll: results[0],
            modifier: dexModifier,
            total: finalResult,
            timestamp: new Date().toLocaleTimeString()
        };

        setActionResults(newAction);
        setActionHistory(prevHistory => [newAction, ...prevHistory].slice(0, 10));
    };

    // Render action results
    const renderActionResults = () => {
        if (!actionResults) return null;

        switch (actionResults.type) {
            case 'skill':
                return (
                    <div className="action-result skill-check">
                        <h3>Skill Check: {actionResults.skill}</h3>
                        <p className="dice-roll">Roll: <span className="dice d20">{actionResults.roll}</span></p>
                        <p>Modifier: {actionResults.modifier >= 0 ? '+' : ''}{actionResults.modifier}</p>
                        <p className="total-result">Total: {actionResults.total}</p>
                    </div>
                );
            case 'attack':
                return (
                    <div className="action-result attack-roll">
                        <h3>{actionResults.attackType} Attack</h3>
                        <div className="attack-section">
                            <p className="dice-roll">Attack Roll: <span className="dice d20">{actionResults.roll}</span></p>
                            <p>Modifier: {actionResults.attackModifier >= 0 ? '+' : ''}{actionResults.attackModifier}</p>
                            <p className="total-result">Total: {actionResults.attackTotal}</p>
                        </div>
                        <div className="damage-section">
                            <p>Damage Roll: {actionResults.damageRoll.join(' + ')}</p>
                            <p>Modifier: {actionResults.damageModifier >= 0 ? '+' : ''}{actionResults.damageModifier}</p>
                            <p className="total-result">Total Damage: {actionResults.totalDamage}</p>
                        </div>
                    </div>
                );
            case 'save':
                return (
                    <div className="action-result saving-throw">
                        <h3>{actionResults.ability} Saving Throw</h3>
                        <p className="dice-roll">Roll: <span className="dice d20">{actionResults.roll}</span></p>
                        <p>Modifier: {actionResults.modifier >= 0 ? '+' : ''}{actionResults.modifier}</p>
                        <p className="total-result">Total: {actionResults.total}</p>
                    </div>
                );
            case 'spell':
                return (
                    <div className="action-result spell-cast">
                        <h3>Spellcasting ({actionResults.ability})</h3>
                        <p>Spell Save DC: {actionResults.spellDC}</p>
                        <div className="spell-attack">
                            <p className="dice-roll">Spell Attack: <span className="dice d20">{actionResults.spellAttackRoll}</span></p>
                            <p>Bonus: {actionResults.spellAttackBonus >= 0 ? '+' : ''}{actionResults.spellAttackBonus}</p>
                            <p className="total-result">Total: {actionResults.spellAttackTotal}</p>
                        </div>
                    </div>
                );
            case 'shortRest':
                return (
                    <div className="action-result short-rest">
                        <h3>Short Rest</h3>
                        <p>Hit Dice Roll: {actionResults.hitDiceRoll}</p>
                        <p>Con Modifier: {actionResults.conModifier >= 0 ? '+' : ''}{actionResults.conModifier}</p>
                        <p className="total-result">HP Recovered: {actionResults.healingAmount}</p>
                    </div>
                );
            case 'longRest':
                return (
                    <div className="action-result long-rest">
                        <h3>Long Rest</h3>
                        <p>{actionResults.message}</p>
                    </div>
                );
            case 'initiative':
                return (
                    <div className="action-result initiative">
                        <h3>Initiative Roll</h3>
                        <p className="dice-roll">Roll: <span className="dice d20">{actionResults.roll}</span></p>
                        <p>Dex Modifier: {actionResults.modifier >= 0 ? '+' : ''}{actionResults.modifier}</p>
                        <p className="total-result">Total: {actionResults.total}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="character-actions">
            <h2>Character Actions</h2>

            <div className="action-buttons-container">
                <div className="action-category">
                    <h3>Combat</h3>
                    <div className="button-group">
                        <button onClick={() => performAttackRoll('Melee')}>Melee Attack</button>
                        <button onClick={() => performAttackRoll('Ranged')}>Ranged Attack</button>
                        <button onClick={rollInitiative}>Roll Initiative</button>
                    </div>
                </div>

                <div className="action-category">
                    <h3>Abilities</h3>
                    <div className="button-group">
                        {Object.keys(character.stats).map(ability => (
                            <button key={ability} onClick={() => performSavingThrow(ability)}>
                                {ability.slice(0, 3)} Save
                            </button>
                        ))}
                    </div>
                </div>

                <div className="action-category">
                    <h3>Skills</h3>
                    <div className="button-group">
                        <button onClick={() => performSkillCheck('Perception', character.stats.Wisdom)}>Perception</button>
                        <button onClick={() => performSkillCheck('Stealth', character.stats.Dexterity)}>Stealth</button>
                        <button onClick={() => performSkillCheck('Athletics', character.stats.Strength)}>Athletics</button>
                        <button onClick={() => performSkillCheck('Persuasion', character.stats.Charisma)}>Persuasion</button>
                    </div>
                </div>

                <div className="action-category">
                    <h3>Rest & Recovery</h3>
                    <div className="button-group">
                        <button onClick={takeShortRest}>Short Rest</button>
                        <button onClick={takeLongRest}>Long Rest</button>
                    </div>
                </div>

                <div className="action-category">
                    <h3>Magic</h3>
                    <div className="button-group">
                        <button onClick={castSpell}>Cast Spell</button>
                    </div>
                </div>
            </div>

            <div className="results-container">
                <div className="current-result">
                    {renderActionResults()}
                </div>

                <div className="action-history">
                    <h3>Action History</h3>
                    {actionHistory.length === 0 ? (
                        <p className="history-empty">No actions performed yet</p>
                    ) : (
                        <ul className="history-list">
                            {actionHistory.map((action, index) => (
                                <li key={index} className="history-item">
                                    <span className="history-time">{action.timestamp}</span>
                                    {action.type === 'skill' && (
                                        <span>{action.skill} check: {action.total}</span>
                                    )}
                                    {action.type === 'attack' && (
                                        <span>{action.attackType} attack: {action.attackTotal} (damage: {action.totalDamage})</span>
                                    )}
                                    {action.type === 'save' && (
                                        <span>{action.ability} save: {action.total}</span>
                                    )}
                                    {action.type === 'spell' && (
                                        <span>Spell cast (attack: {action.spellAttackTotal})</span>
                                    )}
                                    {action.type === 'shortRest' && (
                                        <span>Short rest: recovered {action.healingAmount} HP</span>
                                    )}
                                    {action.type === 'longRest' && (
                                        <span>Long rest taken</span>
                                    )}
                                    {action.type === 'initiative' && (
                                        <span>Initiative: {action.total}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterActions;