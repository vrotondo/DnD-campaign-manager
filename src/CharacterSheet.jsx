import { useState, useEffect } from 'react';
import './CharacterSheet.css';

const CharacterSheet = ({ character, onUpdateCharacter }) => {
    const [activeTab, setActiveTab] = useState('abilities');
    const [characterData, setCharacterData] = useState({
        name: character.name || 'Unnamed Character',
        level: character.level || 1,
        hitPoints: character.hitPoints || {
            current: 10,
            maximum: 10,
            temporary: 0
        },
        skills: character.skills || generateDefaultSkills(),
        savingThrows: character.savingThrows || generateDefaultSavingThrows(),
        weapons: character.weapons || generateDefaultWeapons(),
        inventory: character.inventory || generateDefaultInventory(),
        currency: character.currency || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
        spellSlots: character.spellSlots || generateDefaultSpellSlots(),
        spells: character.spells || generateDefaultSpells(),
        features: character.features || generateDefaultFeatures()
    });

    // Update local state when character prop changes
    useEffect(() => {
        setCharacterData({
            name: character.name || 'Unnamed Character',
            level: character.level || 1,
            hitPoints: character.hitPoints || {
                current: 10,
                maximum: 10,
                temporary: 0
            },
            skills: character.skills || generateDefaultSkills(),
            savingThrows: character.savingThrows || generateDefaultSavingThrows(),
            weapons: character.weapons || generateDefaultWeapons(),
            inventory: character.inventory || generateDefaultInventory(),
            currency: character.currency || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
            spellSlots: character.spellSlots || generateDefaultSpellSlots(),
            spells: character.spells || generateDefaultSpells(),
            features: character.features || generateDefaultFeatures()
        });
    }, [character]);

    // Generate default skills based on ability scores
    function generateDefaultSkills() {
        return {
            acrobatics: { ability: 'Dexterity', proficient: false },
            animalHandling: { ability: 'Wisdom', proficient: false },
            arcana: { ability: 'Intelligence', proficient: false },
            athletics: { ability: 'Strength', proficient: false },
            deception: { ability: 'Charisma', proficient: false },
            history: { ability: 'Intelligence', proficient: false },
            insight: { ability: 'Wisdom', proficient: false },
            intimidation: { ability: 'Charisma', proficient: false },
            investigation: { ability: 'Intelligence', proficient: false },
            medicine: { ability: 'Wisdom', proficient: false },
            nature: { ability: 'Intelligence', proficient: false },
            perception: { ability: 'Wisdom', proficient: false },
            performance: { ability: 'Charisma', proficient: false },
            persuasion: { ability: 'Charisma', proficient: false },
            religion: { ability: 'Intelligence', proficient: false },
            sleightOfHand: { ability: 'Dexterity', proficient: false },
            stealth: { ability: 'Dexterity', proficient: false },
            survival: { ability: 'Wisdom', proficient: false }
        };
    }

    // Generate default saving throws
    function generateDefaultSavingThrows() {
        return {
            Strength: false,
            Dexterity: false,
            Constitution: false,
            Intelligence: false,
            Wisdom: false,
            Charisma: false
        };
    }

    // Generate default weapons
    function generateDefaultWeapons() {
        return [
            {
                name: 'Longsword',
                attack: 'Strength',
                damage: '1d8',
                damageType: 'slashing',
                properties: 'Versatile (1d10)'
            },
            {
                name: 'Shortbow',
                attack: 'Dexterity',
                damage: '1d6',
                damageType: 'piercing',
                properties: 'Ammunition, range (80/320)'
            }
        ];
    }

    // Generate default inventory
    function generateDefaultInventory() {
        return [
            { name: 'Backpack', quantity: 1, weight: '5 lb' },
            { name: 'Bedroll', quantity: 1, weight: '7 lb' },
            { name: 'Rations (days)', quantity: 5, weight: '10 lb' },
            { name: 'Rope, hempen (50 feet)', quantity: 1, weight: '10 lb' },
            { name: 'Tinderbox', quantity: 1, weight: '1 lb' }
        ];
    }

    // Generate default spell slots
    function generateDefaultSpellSlots() {
        return {
            '1st': { current: 0, maximum: 4 },
            '2nd': { current: 0, maximum: 3 },
            '3rd': { current: 0, maximum: 3 },
            '4th': { current: 0, maximum: 3 },
            '5th': { current: 0, maximum: 2 },
            '6th': { current: 0, maximum: 1 },
            '7th': { current: 0, maximum: 1 },
            '8th': { current: 0, maximum: 1 },
            '9th': { current: 0, maximum: 1 }
        };
    }

    // Generate default spells
    function generateDefaultSpells() {
        return {
            cantrips: [
                { name: 'Fire Bolt', prepared: true, castingTime: '1 action', range: '120 feet', components: 'V, S' },
                { name: 'Mage Hand', prepared: true, castingTime: '1 action', range: '30 feet', components: 'V, S' }
            ],
            '1st': [
                { name: 'Magic Missile', prepared: true, castingTime: '1 action', range: '120 feet', components: 'V, S' },
                { name: 'Shield', prepared: true, castingTime: '1 reaction', range: 'Self', components: 'V, S' }
            ]
        };
    }

    // Generate default features
    function generateDefaultFeatures() {
        if (character.race === 'Elf') {
            return [
                {
                    name: 'Darkvision',
                    description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.'
                },
                {
                    name: 'Fey Ancestry',
                    description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.'
                },
                {
                    name: 'Trance',
                    description: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'
                }
            ];
        } else if (character.class === 'Wizard') {
            return [
                {
                    name: 'Spellcasting',
                    description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.'
                },
                {
                    name: 'Arcane Recovery',
                    description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover.'
                }
            ];
        } else {
            return [
                {
                    name: 'Racial Trait',
                    description: 'A special ability from your race.'
                },
                {
                    name: 'Class Feature',
                    description: 'A special ability from your class.'
                }
            ];
        }
    }

    // Calculate ability modifier
    const getAbilityModifier = (score) => {
        return Math.floor((score - 10) / 2);
    };

    // Format modifier as a string with + or -
    const formatModifier = (modifier) => {
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    };

    // Handle changes to ability scores
    const handleAbilityChange = (ability, value) => {
        const newValue = parseInt(value);
        if (isNaN(newValue) || newValue < 1 || newValue > 30) return;

        const updatedCharacter = {
            ...character,
            stats: {
                ...character.stats,
                [ability]: newValue
            }
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Calculate proficiency bonus based on level
    const getProficiencyBonus = () => {
        const level = characterData.level;
        return Math.floor((level - 1) / 4) + 2;
    };

    // Handle changes to hit points
    const handleHitPointChange = (type, value) => {
        const newValue = parseInt(value);
        if (isNaN(newValue) || newValue < 0) return;

        const updatedHitPoints = { ...characterData.hitPoints };
        updatedHitPoints[type] = newValue;

        const updatedCharacterData = {
            ...characterData,
            hitPoints: updatedHitPoints
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            hitPoints: updatedHitPoints
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Handle changes to skill proficiency
    const handleSkillProficiencyChange = (skillName, isProficient) => {
        const updatedSkills = {
            ...characterData.skills,
            [skillName]: {
                ...characterData.skills[skillName],
                proficient: isProficient
            }
        };

        const updatedCharacterData = {
            ...characterData,
            skills: updatedSkills
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            skills: updatedSkills
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Handle changes to saving throw proficiency
    const handleSavingThrowChange = (ability, isProficient) => {
        const updatedSavingThrows = {
            ...characterData.savingThrows,
            [ability]: isProficient
        };

        const updatedCharacterData = {
            ...characterData,
            savingThrows: updatedSavingThrows
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            savingThrows: updatedSavingThrows
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Handle changes to currency
    const handleCurrencyChange = (currency, value) => {
        const newValue = parseInt(value);
        if (isNaN(newValue) || newValue < 0) return;

        const updatedCurrency = {
            ...characterData.currency,
            [currency]: newValue
        };

        const updatedCharacterData = {
            ...characterData,
            currency: updatedCurrency
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            currency: updatedCurrency
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Handle changes to spell slots
    const handleSpellSlotChange = (level, field, value) => {
        const newValue = parseInt(value);
        if (isNaN(newValue) || newValue < 0 ||
            (field === 'current' && newValue > characterData.spellSlots[level].maximum)) return;

        const updatedSpellSlots = {
            ...characterData.spellSlots,
            [level]: {
                ...characterData.spellSlots[level],
                [field]: newValue
            }
        };

        const updatedCharacterData = {
            ...characterData,
            spellSlots: updatedSpellSlots
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            spellSlots: updatedSpellSlots
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Handle changes to spell preparation
    const handleSpellPreparedChange = (level, index, isPrepared) => {
        const spellLevel = level === 'cantrips' ? 'cantrips' : level;

        const updatedSpells = {
            ...characterData.spells,
            [spellLevel]: characterData.spells[spellLevel].map((spell, i) => {
                if (i === index) {
                    return { ...spell, prepared: isPrepared };
                }
                return spell;
            })
        };

        const updatedCharacterData = {
            ...characterData,
            spells: updatedSpells
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            spells: updatedSpells
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }
    };

    // Add a new feature
    const [newFeature, setNewFeature] = useState({
        name: '',
        description: ''
    });

    const handleFeatureNameChange = (e) => {
        setNewFeature({
            ...newFeature,
            name: e.target.value
        });
    };

    const handleFeatureDescriptionChange = (e) => {
        setNewFeature({
            ...newFeature,
            description: e.target.value
        });
    };

    const addNewFeature = () => {
        if (!newFeature.name || !newFeature.description) return;

        const updatedFeatures = [
            ...characterData.features,
            { ...newFeature }
        ];

        const updatedCharacterData = {
            ...characterData,
            features: updatedFeatures
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            features: updatedFeatures
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }

        // Reset form
        setNewFeature({
            name: '',
            description: ''
        });
    };

    // Add new inventory item
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1,
        weight: ''
    });

    const handleItemNameChange = (e) => {
        setNewItem({
            ...newItem,
            name: e.target.value
        });
    };

    const handleItemQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) return;

        setNewItem({
            ...newItem,
            quantity: value
        });
    };

    const handleItemWeightChange = (e) => {
        setNewItem({
            ...newItem,
            weight: e.target.value
        });
    };

    const addNewItem = () => {
        if (!newItem.name) return;

        const updatedInventory = [
            ...characterData.inventory,
            { ...newItem }
        ];

        const updatedCharacterData = {
            ...characterData,
            inventory: updatedInventory
        };

        setCharacterData(updatedCharacterData);

        const updatedCharacter = {
            ...character,
            inventory: updatedInventory
        };

        if (onUpdateCharacter) {
            onUpdateCharacter(updatedCharacter);
        }

        // Reset form
        setNewItem({
            name: '',
            quantity: 1,
            weight: ''
        });
    };

    // Get ability name abbreviation
    const getAbilityAbbreviation = (abilityName) => {
        const abbreviations = {
            'Strength': 'STR',
            'Dexterity': 'DEX',
            'Constitution': 'CON',
            'Intelligence': 'INT',
            'Wisdom': 'WIS',
            'Charisma': 'CHA'
        };

        return abbreviations[abilityName] || abilityName.slice(0, 3).toUpperCase();
    };

    // Get the ability score for a skill
    const getSkillAbilityScore = (skill) => {
        const abilityName = characterData.skills[skill].ability;
        return character.stats[abilityName];
    };

    // Calculate skill modifier
    const getSkillModifier = (skill) => {
        const abilityScore = getSkillAbilityScore(skill);
        const abilityModifier = getAbilityModifier(abilityScore);
        const proficiencyBonus = characterData.skills[skill].proficient ? getProficiencyBonus() : 0;

        return abilityModifier + proficiencyBonus;
    };

    return (
        <div className="character-sheet">
            <div className="character-sheet-header">
                <div className="character-name-section">
                    <h2>{characterData.name}</h2>
                    <div className="character-basics">
                        <span className="character-race-class">
                            {character.race} {character.class}
                        </span>
                        <span className="character-level">Level {characterData.level}</span>
                    </div>
                </div>

                <div className="character-health-section">
                    <div className="health-container">
                        <div className="health-label">Hit Points</div>
                        <div className="health-values">
                            <input
                                type="number"
                                className="current-hp"
                                value={characterData.hitPoints.current}
                                onChange={(e) => handleHitPointChange('current', e.target.value)}
                                min="0"
                                max={characterData.hitPoints.maximum}
                            />
                            <span className="hp-separator">/</span>
                            <input
                                type="number"
                                className="max-hp"
                                value={characterData.hitPoints.maximum}
                                onChange={(e) => handleHitPointChange('maximum', e.target.value)}
                                min="1"
                            />
                        </div>
                        <div className="temp-hp">
                            Temp HP:
                            <input
                                type="number"
                                value={characterData.hitPoints.temporary}
                                onChange={(e) => handleHitPointChange('temporary', e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="character-sheet-tabs">
                <button
                    className={activeTab === 'abilities' ? 'active' : ''}
                    onClick={() => setActiveTab('abilities')}
                >
                    Abilities & Skills
                </button>
                <button
                    className={activeTab === 'combat' ? 'active' : ''}
                    onClick={() => setActiveTab('combat')}
                >
                    Combat
                </button>
                <button
                    className={activeTab === 'equipment' ? 'active' : ''}
                    onClick={() => setActiveTab('equipment')}
                >
                    Equipment
                </button>
                <button
                    className={activeTab === 'spells' ? 'active' : ''}
                    onClick={() => setActiveTab('spells')}
                >
                    Spells
                </button>
                <button
                    className={activeTab === 'features' ? 'active' : ''}
                    onClick={() => setActiveTab('features')}
                >
                    Features
                </button>
            </div>

            <div className="character-sheet-content">
                {activeTab === 'abilities' && (
                    <div className="abilities-tab">
                        <div className="abilities-container">
                            <h3>Ability Scores</h3>
                            <div className="abilities-grid">
                                {Object.entries(character.stats).map(([ability, score]) => (
                                    <div key={ability} className="ability-block">
                                        <div className="ability-name">{ability}</div>
                                        <input
                                            type="number"
                                            value={score}
                                            onChange={(e) => handleAbilityChange(ability, e.target.value)}
                                            min="1"
                                            max="30"
                                            className="ability-score"
                                        />
                                        <div className="ability-modifier">
                                            {formatModifier(getAbilityModifier(score))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="proficiency-bonus">
                            <h3>Proficiency Bonus</h3>
                            <div className="proficiency-value">
                                {formatModifier(getProficiencyBonus())}
                            </div>
                        </div>

                        <div className="skills-container">
                            <h3>Skills</h3>
                            <div className="skills-list">
                                {Object.entries(characterData.skills).map(([skillKey, skillData]) => {
                                    const displayName = skillKey.replace(/([A-Z])/g, ' $1').trim();
                                    const modifier = getSkillModifier(skillKey);

                                    return (
                                        <div key={skillKey} className="skill-item">
                                            <input
                                                type="checkbox"
                                                id={skillKey}
                                                checked={skillData.proficient}
                                                onChange={(e) => handleSkillProficiencyChange(skillKey, e.target.checked)}
                                            />
                                            <label htmlFor={skillKey}>{displayName}</label>
                                            <span className="skill-ability">{getAbilityAbbreviation(skillData.ability)}</span>
                                            <span className="skill-modifier">
                                                {formatModifier(modifier)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'combat' && (
                    <div className="combat-tab">
                        <h3>Combat Information</h3>
                        <div className="combat-grid">
                            <div className="combat-stat">
                                <div className="stat-name">Armor Class</div>
                                <div className="stat-value">
                                    {10 + getAbilityModifier(character.stats.Dexterity)}
                                </div>
                            </div>
                            <div className="combat-stat">
                                <div className="stat-name">Initiative</div>
                                <div className="stat-value">
                                    {formatModifier(getAbilityModifier(character.stats.Dexterity))}
                                </div>
                            </div>
                            <div className="combat-stat">
                                <div className="stat-name">Speed</div>
                                <div className="stat-value">30 ft</div>
                            </div>
                        </div>

                        <h3>Saving Throws</h3>
                        <div className="saving-throws">
                            {Object.entries(characterData.savingThrows).map(([ability, isProficient]) => (
                                <div key={ability} className="saving-throw-item">
                                    <input
                                        type="checkbox"
                                        id={`save-${ability.toLowerCase()}`}
                                        checked={isProficient}
                                        onChange={(e) => handleSavingThrowChange(ability, e.target.checked)}
                                    />
                                    <label htmlFor={`save-${ability.toLowerCase()}`}>{ability}</label>
                                    <span className="save-modifier">
                                        {formatModifier(getAbilityModifier(character.stats[ability]) + (isProficient ? getProficiencyBonus() : 0))}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <h3>Weapons</h3>
                        <div className="weapons-list">
                            <div className="weapons-header">
                                <span className="weapon-name">Name</span>
                                <span className="weapon-attack">Attack</span>
                                <span className="weapon-damage">Damage</span>
                                <span className="weapon-properties">Properties</span>
                            </div>

                            {characterData.weapons.map((weapon, index) => (
                                <div key={index} className="weapon-item">
                                    <span className="weapon-name">{weapon.name}</span>
                                    <span className="weapon-attack">
                                        {formatModifier(getAbilityModifier(character.stats[weapon.attack]) + getProficiencyBonus())}
                                    </span>
                                    <span className="weapon-damage">
                                        {weapon.damage} {formatModifier(getAbilityModifier(character.stats[weapon.attack]))} {weapon.damageType}
                                    </span>
                                    <span className="weapon-properties">{weapon.properties}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'equipment' && (
                    <div className="equipment-tab">
                        <h3>Inventory</h3>
                        <div className="equipment-section">
                            <div className="currency-group">
                                <div className="currency-item">
                                    <label htmlFor="cp">CP</label>
                                    <input
                                        type="number"
                                        id="cp"
                                        value={characterData.currency.cp}
                                        onChange={(e) => handleCurrencyChange('cp', e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <div className="currency-item">
                                    <label htmlFor="sp">SP</label>
                                    <input
                                        type="number"
                                        id="sp"
                                        value={characterData.currency.sp}
                                        onChange={(e) => handleCurrencyChange('sp', e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <div className="currency-item">
                                    <label htmlFor="ep">EP</label>
                                    <input
                                        type="number"
                                        id="ep"
                                        value={characterData.currency.ep}
                                        onChange={(e) => handleCurrencyChange('ep', e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <div className="currency-item">
                                    <label htmlFor="gp">GP</label>
                                    <input
                                        type="number"
                                        id="gp"
                                        value={characterData.currency.gp}
                                        onChange={(e) => handleCurrencyChange('gp', e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <div className="currency-item">
                                    <label htmlFor="pp">PP</label>
                                    <input
                                        type="number"
                                        id="pp"
                                        value={characterData.currency.pp}
                                        onChange={(e) => handleCurrencyChange('pp', e.target.value)}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="inventory-list">
                                <div className="inventory-header">
                                    <span className="item-name">Item</span>
                                    <span className="item-quantity">Qty</span>
                                    <span className="item-weight">Weight</span>
                                </div>

                                {characterData.inventory.map((item, index) => (
                                    <div key={index} className="inventory-item">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">{item.quantity}</span>
                                        <span className="item-weight">{item.weight}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="add-item-form">
                                <input
                                    type="text"
                                    placeholder="Item name"
                                    className="new-item-name"
                                    value={newItem.name}
                                    onChange={handleItemNameChange}
                                />
                                <input
                                    type="number"
                                    value={newItem.quantity}
                                    onChange={handleItemQuantityChange}
                                    min="1"
                                    className="new-item-quantity"
                                />
                                <input
                                    type="text"
                                    placeholder="Weight"
                                    className="new-item-weight"
                                    value={newItem.weight}
                                    onChange={handleItemWeightChange}
                                />
                                <button className="add-item-btn" onClick={addNewItem}>Add</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'spells' && (
                    <div className="spells-tab">
                        <h3>Spellcasting</h3>
                        <div className="spellcasting-info">
                            <div className="spell-class">
                                <div className="info-label">Spellcasting Class</div>
                                <div className="info-value">{character.class}</div>
                            </div>
                            <div className="spell-ability">
                                <div className="info-label">Spellcasting Ability</div>
                                <div className="info-value">
                                    {(() => {
                                        switch (character.class) {
                                            case 'Wizard':
                                            case 'Artificer':
                                                return 'Intelligence';
                                            case 'Cleric':
                                            case 'Druid':
                                            case 'Ranger':
                                                return 'Wisdom';
                                            case 'Bard':
                                            case 'Paladin':
                                            case 'Sorcerer':
                                            case 'Warlock':
                                                return 'Charisma';
                                            default:
                                                return 'None';
                                        }
                                    })()}
                                </div>
                            </div>
                            <div className="spell-save">
                                <div className="info-label">Spell Save DC</div>
                                <div className="info-value">
                                    {(() => {
                                        let ability;
                                        switch (character.class) {
                                            case 'Wizard':
                                            case 'Artificer':
                                                ability = 'Intelligence';
                                                break;
                                            case 'Cleric':
                                            case 'Druid':
                                            case 'Ranger':
                                                ability = 'Wisdom';
                                                break;
                                            case 'Bard':
                                            case 'Paladin':
                                            case 'Sorcerer':
                                            case 'Warlock':
                                                ability = 'Charisma';
                                                break;
                                            default:
                                                return 'N/A';
                                        }
                                        return 8 + getProficiencyBonus() + getAbilityModifier(character.stats[ability]);
                                    })()}
                                </div>
                            </div>
                            <div className="spell-attack">
                                <div className="info-label">Spell Attack Bonus</div>
                                <div className="info-value">
                                    {(() => {
                                        let ability;
                                        switch (character.class) {
                                            case 'Wizard':
                                            case 'Artificer':
                                                ability = 'Intelligence';
                                                break;
                                            case 'Cleric':
                                            case 'Druid':
                                            case 'Ranger':
                                                ability = 'Wisdom';
                                                break;
                                            case 'Bard':
                                            case 'Paladin':
                                            case 'Sorcerer':
                                            case 'Warlock':
                                                ability = 'Charisma';
                                                break;
                                            default:
                                                return 'N/A';
                                        }
                                        return formatModifier(getProficiencyBonus() + getAbilityModifier(character.stats[ability]));
                                    })()}
                                </div>
                            </div>
                        </div>

                        <div className="spell-slots">
                            <h3>Spell Slots</h3>
                            <div className="spell-slot-grid">
                                {Object.entries(characterData.spellSlots).map(([level, slots]) => (
                                    <div key={level} className="spell-slot-level">
                                        <div className="slot-level">{level}</div>
                                        <div className="slot-count">
                                            <input
                                                type="number"
                                                value={slots.current}
                                                onChange={(e) => handleSpellSlotChange(level, 'current', e.target.value)}
                                                min="0"
                                                max={slots.maximum}
                                            /> /
                                            <span className="max-slots">{slots.maximum}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="spell-list">
                            <h3>Spells Known</h3>

                            <div className="spell-level-section">
                                <h4>Cantrips</h4>
                                {characterData.spells.cantrips.map((spell, index) => (
                                    <div key={index} className="spell-item">
                                        <input
                                            type="checkbox"
                                            id={`spell-cantrip-${index}`}
                                            checked={spell.prepared}
                                            onChange={(e) => handleSpellPreparedChange('cantrips', index, e.target.checked)}
                                        />
                                        <label htmlFor={`spell-cantrip-${index}`}>{spell.name}</label>
                                        <div className="spell-info">
                                            <span className="casting-time">{spell.castingTime}</span>
                                            <span className="range">{spell.range}</span>
                                            <span className="components">{spell.components}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {Object.entries(characterData.spells).map(([level, spells]) => {
                                if (level === 'cantrips') return null;

                                return (
                                    <div key={level} className="spell-level-section">
                                        <h4>{level} Level</h4>
                                        {spells.map((spell, index) => (
                                            <div key={index} className="spell-item">
                                                <input
                                                    type="checkbox"
                                                    id={`spell-${level}-${index}`}
                                                    checked={spell.prepared}
                                                    onChange={(e) => handleSpellPreparedChange(level, index, e.target.checked)}
                                                />
                                                <label htmlFor={`spell-${level}-${index}`}>{spell.name}</label>
                                                <div className="spell-info">
                                                    <span className="casting-time">{spell.castingTime}</span>
                                                    <span className="range">{spell.range}</span>
                                                    <span className="components">{spell.components}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="features-tab">
                        <h3>Features & Traits</h3>
                        <div className="features-list">
                            {characterData.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <h4 className="feature-name">{feature.name}</h4>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="add-feature-form">
                            <h3>Add Feature</h3>
                            <input
                                type="text"
                                placeholder="Feature name"
                                className="new-feature-name"
                                value={newFeature.name}
                                onChange={handleFeatureNameChange}
                            />
                            <textarea
                                placeholder="Feature description"
                                className="new-feature-description"
                                value={newFeature.description}
                                onChange={handleFeatureDescriptionChange}
                            ></textarea>
                            <button className="add-feature-btn" onClick={addNewFeature}>Add Feature</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterSheet;
