import { useState } from 'react';
import CharacterCreator from './CharacterCreator';
import CharacterActions from './CharacterActions';
import CombatTracker from './CombatTracker';
import DiceRoller from './DiceRoller';
import CharacterStorage from './CharacterStorage';
import CharacterSheet from './CharacterSheet';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('character');
  const [currentCharacter, setCurrentCharacter] = useState(null);

  // Function to handle receiving a created character from CharacterCreator
  const handleCharacterCreated = (character) => {
    setCurrentCharacter(character);
  };

  return (
    <div className="dnd-app">
      <header className="app-header">
        <h1>D&D 5E Campaign Manager</h1>
        <nav className="main-nav">
          <ul>
            <li>
              <button
                className={activeTab === 'character' ? 'active' : ''}
                onClick={() => setActiveTab('character')}
              >
                Character Sheets
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'campaigns' ? 'active' : ''}
                onClick={() => setActiveTab('campaigns')}
              >
                Campaigns
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'notes' ? 'active' : ''}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-content">
        {activeTab === 'character' && (
          <div className="character-tab">
            <CharacterCreator onCharacterCreated={handleCharacterCreated} />
            <CharacterStorage
              currentCharacter={currentCharacter}
              onLoadCharacter={handleCharacterCreated}
            />
            {currentCharacter && (
              <>
                <CharacterSheet
                  character={currentCharacter}
                  onUpdateCharacter={handleCharacterCreated}
                />
                <CharacterActions character={currentCharacter} />
                <div className="game-tools-container">
                  <CombatTracker character={currentCharacter} />
                  <DiceRoller />
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="campaigns-tab">
            <h2>Campaign Management</h2>
            <p>This section will contain campaign management features.</p>
            <p>Coming soon: World building, faction info, and campaign notes.</p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="notes-tab">
            <h2>Campaign Notes</h2>
            <p>This section will contain your campaign notes.</p>
            <p>Coming soon: Session logs, player notes, and DM planning tools.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>D&D 5E Campaign Manager &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;