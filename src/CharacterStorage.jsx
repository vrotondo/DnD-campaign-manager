import { useState, useEffect } from 'react';
import './CharacterStorage.css';

const CharacterStorage = ({ onLoadCharacter, currentCharacter }) => {
    const [savedCharacters, setSavedCharacters] = useState([]);
    const [characterName, setCharacterName] = useState('');

    // Load saved characters from localStorage when component mounts
    useEffect(() => {
        const storedCharacters = localStorage.getItem('dndCharacters');
        if (storedCharacters) {
            try {
                setSavedCharacters(JSON.parse(storedCharacters));
            } catch (error) {
                console.error('Error loading characters:', error);
                // If there's an error parsing, initialize with empty array
                setSavedCharacters([]);
            }
        }
    }, []);

    // Save current character to storage
    const saveCharacter = () => {
        if (!currentCharacter) return;
        if (!characterName.trim()) {
            alert('Please enter a name for your character');
            return;
        }

        // Check if a character with this name already exists
        const existingIndex = savedCharacters.findIndex(char => char.name === characterName);

        // Create a new character object with the current character data and name
        const characterToSave = {
            ...currentCharacter,
            name: characterName,
            savedAt: new Date().toISOString()
        };

        let updatedCharacters;

        if (existingIndex >= 0) {
            // If character exists, ask for confirmation before overwriting
            if (window.confirm(`A character named "${characterName}" already exists. Do you want to overwrite it?`)) {
                updatedCharacters = [...savedCharacters];
                updatedCharacters[existingIndex] = characterToSave;
            } else {
                return;
            }
        } else {
            // If character doesn't exist, add it to the array
            updatedCharacters = [...savedCharacters, characterToSave];
        }

        // Update state and save to localStorage
        setSavedCharacters(updatedCharacters);
        localStorage.setItem('dndCharacters', JSON.stringify(updatedCharacters));

        // Clear the name input
        setCharacterName('');
    };

    // Load a character from storage
    const loadCharacter = (character) => {
        if (onLoadCharacter) {
            onLoadCharacter(character);
        }
    };

    // Delete a character from storage
    const deleteCharacter = (index, event) => {
        event.stopPropagation(); // Prevent triggering the click on the parent element

        if (window.confirm('Are you sure you want to delete this character?')) {
            const updatedCharacters = [...savedCharacters];
            updatedCharacters.splice(index, 1);

            setSavedCharacters(updatedCharacters);
            localStorage.setItem('dndCharacters', JSON.stringify(updatedCharacters));
        }
    };

    // Format the date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="character-storage">
            <h2>Character Storage</h2>

            {currentCharacter ? (
                <div className="save-character-form">
                    <div className="form-group">
                        <label htmlFor="character-name">Character Name:</label>
                        <input
                            id="character-name"
                            type="text"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            placeholder="Enter character name"
                        />
                    </div>
                    <button className="save-character-btn" onClick={saveCharacter}>
                        Save Current Character
                    </button>
                </div>
            ) : (
                <div className="no-character-message">
                    <p>Create a character to save it to your collection</p>
                </div>
            )}

            <div className="saved-characters-section">
                <h3>Saved Characters</h3>

                {savedCharacters.length === 0 ? (
                    <p className="no-characters-message">No saved characters yet</p>
                ) : (
                    <div className="character-list">
                        {savedCharacters.map((character, index) => (
                            <div
                                key={index}
                                className="character-card"
                                onClick={() => loadCharacter(character)}
                            >
                                <div className="character-info">
                                    <h4 className="character-name">{character.name}</h4>
                                    <div className="character-details">
                                        <span className="character-race-class">
                                            {character.race} {character.class}
                                        </span>
                                        <span className="character-saved-date">
                                            Saved: {formatDate(character.savedAt)}
                                        </span>
                                    </div>
                                </div>
                                <div className="character-actions">
                                    <button
                                        className="delete-character-btn"
                                        onClick={(e) => deleteCharacter(index, e)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterStorage;