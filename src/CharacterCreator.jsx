import { useState } from 'react';
import './CharacterCreator.css';

const CharacterCreator = ({ onCharacterCreated }) => {
    // State for the character
    const [character, setCharacter] = useState(null);

    // Lists of possible races and classes
    const races = ["Human", "Elf", "Dwarf", "Halfling", "Tiefling", "Dragonborn", "Gnome", "Half-Orc", "Half-Elf"];
    const classes = ["Fighter", "Wizard", "Rogue", "Cleric", "Barbarian", "Bard", "Druid", "Monk", "Paladin", "Ranger", "Sorcerer", "Warlock"];

    // Function to roll a 6-sided die
    const rollD6 = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    // Function to roll 4d6 and drop the lowest roll (standard D&D stat generation)
    const rollStat = () => {
        let rolls = Array(4).fill().map(() => rollD6());
        rolls.sort((a, b) => b - a); // Sort in descending order
        return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0); // Sum the top 3 rolls
    };

    // Function to generate a character
    const createCharacter = () => {
        // Randomly select race and class
        const race = races[Math.floor(Math.random() * races.length)];
        const charClass = classes[Math.floor(Math.random() * classes.length)];

        // Roll stats
        const stats = {
            "Strength": rollStat(),
            "Dexterity": rollStat(),
            "Constitution": rollStat(),
            "Intelligence": rollStat(),
            "Wisdom": rollStat(),
            "Charisma": rollStat(),
        };

        // Create the character object
        const newCharacter = {
            race,
            class: charClass,
            stats,
        };

        // Set the character state
        setCharacter(newCharacter);

        // Notify parent component of character creation
        if (onCharacterCreated) {
            onCharacterCreated(newCharacter);
        }
    };

    // Function to handle manual stat updates
    const handleStatChange = (stat, value) => {
        if (!character) return;

        const newValue = parseInt(value);
        if (isNaN(newValue)) return;

        const updatedCharacter = {
            ...character,
            stats: {
                ...character.stats,
                [stat]: newValue
            }
        };

        setCharacter(updatedCharacter);

        // Notify parent component of character update
        if (onCharacterCreated) {
            onCharacterCreated(updatedCharacter);
        }
    };

    // Function to handle race or class change
    const handleSelectChange = (field, value) => {
        if (!character) return;

        const updatedCharacter = {
            ...character,
            [field]: value
        };

        setCharacter(updatedCharacter);

        // Notify parent component of character update
        if (onCharacterCreated) {
            onCharacterCreated(updatedCharacter);
        }
    };

    return (
        <div className="character-creator">
            <h1>D&D 5E Character Creator</h1>

            {!character ? (
                <div className="initial-screen">
                    <p>Welcome to the D&D Character Creator! Press the button below to create your character...</p>
                    <button onClick={createCharacter} className="create-btn">Create Random Character</button>
                </div>
            ) : (
                <div className="character-sheet">
                    <div className="character-header">
                        <div className="form-group">
                            <label htmlFor="race-select">Race:</label>
                            <select
                                id="race-select"
                                value={character.race}
                                onChange={(e) => handleSelectChange('race', e.target.value)}
                            >
                                {races.map((race) => (
                                    <option key={race} value={race}>{race}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="class-select">Class:</label>
                            <select
                                id="class-select"
                                value={character.class}
                                onChange={(e) => handleSelectChange('class', e.target.value)}
                            >
                                {classes.map((classOption) => (
                                    <option key={classOption} value={classOption}>{classOption}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="stats-container">
                        <h2>Ability Scores</h2>
                        {Object.entries(character.stats).map(([stat, value]) => (
                            <div key={stat} className="stat-group">
                                <label htmlFor={`${stat.toLowerCase()}-stat`}>{stat}:</label>
                                <div className="stat-input-group">
                                    <input
                                        id={`${stat.toLowerCase()}-stat`}
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={value}
                                        onChange={(e) => handleStatChange(stat, e.target.value)}
                                    />
                                    <span className="modifier">{Math.floor((value - 10) / 2) >= 0 ? '+' : ''}{Math.floor((value - 10) / 2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button onClick={createCharacter} className="reroll-btn">Re-Roll Character</button>
                        <button className="save-btn">Save Character</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterCreator;