// --- 1. DATA and CONSTANTS ---

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const AUDIO_FILES = {
    'A': 'audio/A4.mp3', 'A#': 'audio/Bb4.mp3', 'B': 'audio/B4.mp3', 'C': 'audio/C4.mp3', 'C#': 'audio/Db4.mp3', 'D': 'audio/D4.mp3', 'D#': 'audio/Eb4.mp3', 'E': 'audio/E4.mp3', 'F': 'audio/F4.mp3', 'F#': 'audio/Gb4.mp3', 'G': 'audio/G4.mp3', 'G#': 'audio/Ab4.mp3',
};
const SCALE_FORMULAS = {
    major: [2, 2, 1, 2, 2, 2, 1], minor: [2, 1, 2, 2, 1, 2, 2], minorPentatonic: [3, 2, 2, 3, 2], majorPentatonic: [2, 2, 3, 2, 3], blues: [3, 2, 1, 1, 3, 2], ionian: [2, 2, 1, 2, 2, 2, 1], dorian: [2, 1, 2, 2, 2, 1, 2], phrygian: [1, 2, 2, 2, 1, 2, 2], lydian: [2, 2, 2, 1, 2, 2, 1], mixolydian: [2, 2, 1, 2, 2, 1, 2], aeolian: [2, 1, 2, 2, 1, 2, 2], locrian: [1, 2, 2, 1, 2, 2, 2],
};
const CHORD_QUALITIES = {
    major: ['Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'diminished'], minor: ['minor', 'diminished', 'Major', 'minor', 'minor', 'Major', 'Major'], ionian: ['Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'diminished'], dorian: ['minor', 'minor', 'Major', 'Major', 'minor', 'diminished', 'Major'], phrygian: ['minor', 'Major', 'Major', 'minor', 'diminished', 'Major', 'minor'], lydian: ['Major', 'Major', 'minor', 'diminished', 'Major', 'minor', 'minor'], mixolydian: ['Major', 'minor', 'diminished', 'Major', 'minor', 'minor', 'Major'], aeolian: ['minor', 'diminished', 'Major', 'minor', 'minor', 'Major', 'Major'], locrian: ['diminished', 'Major', 'minor', 'minor', 'Major', 'Major', 'minor']
};
const CHORD_FORMULAS = {
    Major: [0, 4, 7], minor: [0, 3, 7], diminished: [0, 3, 6]
};
const SCALE_DESCRIPTIONS = {
    major: { description: "The official scale of campfire songs and dad rock anthems.", artists: ["David Gilmour", "Eric Clapton", "Brian May"] }, minor: { description: "For writing songs about your ex, even if you're happily married.", artists: ["Randy Rhoads", "Yngwie Malmsteen", "Michael Schenker"] }, minorPentatonic: { description: "Congratulations, you now know 90% of all classic rock solos.", artists: ["Jimi Hendrix", "Jimmy Page", "B.B. King", "SRV"] }, majorPentatonic: { description: "Sounds happy in any context. Use with caution at funerals.", artists: ["Dickey Betts", "Duane Allman", "Chuck Berry"] }, blues: { description: "The minor pentatonic scale, but with a spicy little ✨mistake✨.", artists: ["Eric Clapton", "John Mayer", "B.B. King"] }, ionian: { description: "Just a fancy way of saying 'Major Scale'. Sounds smarter though.", artists: ["Frank Zappa", "Joe Satriani", "Jeff Beck"] }, dorian: { description: "The minor scale's cooler, more sophisticated older sibling.", artists: ["Carlos Santana", "Robby Krieger", "David Gilmour"] }, phrygian: { description: "Play this to sound like a flamenco master in a metal band.", artists: ["Kirk Hammett", "Joe Satriani", "Yngwie Malmsteen"] }, lydian: { description: "The major scale, but it went to space for a semester.", artists: ["Steve Vai", "Joe Satriani", "Tom Morello"] }, mixolydian: { description: "The official scale of rock songs that are kinda bluesy but also happy.", artists: ["Jimi Hendrix", "Jerry Garcia", "Angus Young"] }, aeolian: { description: "Just a fancy way of saying 'Natural Minor'. Go tell your friends.", artists: ["Michael Schenker", "Iron Maiden", "Judas Priest"] }, locrian: { description: "Use this to scare your pets and confuse your audience.", artists: ["John Scofield", "Robert Fripp", "Meshuggah"] }
};
const GUITAR_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];
const FRET_COUNT = 24;

// --- 2. DOM ELEMENTS ---
const keySelect = document.getElementById('key-select');
const scaleSelect = document.getElementById('scale-select');
const fretboardContainer = document.getElementById('fretboard-container');
const chordsDisplay = document.getElementById('chords-display');
const scaleDescription = document.getElementById('scale-description');
const notePlayer = document.getElementById('note-player');
const tourOverlay = document.getElementById('tour-overlay');
const tourTooltip = document.getElementById('tour-tooltip');
const tourText = document.getElementById('tour-text');
const tourCounter = document.getElementById('tour-counter');
const tourNextBtn = document.getElementById('tour-next-btn');
const infoIcon = document.getElementById('info-icon'); // New element

// --- 3. CORE LOGIC ---
function calculateScaleNotes(rootNote, formula) {
    const scaleNotes = [rootNote]; let currentIndex = NOTES.indexOf(rootNote);
    for (const step of formula) { currentIndex = (currentIndex + step) % NOTES.length; scaleNotes.push(NOTES[currentIndex]); }
    return scaleNotes;
}
function calculateDiatonicChords(scaleNotes, scaleType) {
    const qualities = CHORD_QUALITIES[scaleType]; if (!qualities) return [];
    return scaleNotes.map((note, index) => qualities[index] ? `${note} ${qualities[index]}` : null).filter(Boolean);
}
function displayChords(chords) {
    chordsDisplay.innerHTML = ''; if (chords.length === 0) { chordsDisplay.innerHTML = '<p style="color: var(--text-dark);">No chords defined for this scale type.</p>'; return; }
    chords.forEach(chord => { const chordChip = document.createElement('div'); chordChip.className = 'chord-chip'; chordChip.textContent = chord; chordsDisplay.appendChild(chordChip); });
}
function clearFretboard() {
    fretboardContainer.querySelectorAll('.note').forEach(note => note.remove());
}
function drawFretboardAndNotes() {
    document.querySelectorAll('.chord-chip').forEach(chip => chip.classList.remove('active')); clearFretboard();
    const selectedKey = keySelect.value; const selectedScale = scaleSelect.value;
    const info = SCALE_DESCRIPTIONS[selectedScale];
    if (info) { scaleDescription.innerHTML = `<p class="one-liner">${info.description}</p><p class="artist-list"><b>Used By:</b> ${info.artists.join(', ')}</p>`; } else { scaleDescription.innerHTML = ""; }
    const scaleNotes = calculateScaleNotes(selectedKey, SCALE_FORMULAS[selectedScale]); const diatonicChords = calculateDiatonicChords(scaleNotes, selectedScale); displayChords(diatonicChords);
    GUITAR_TUNING.slice().reverse().forEach((stringNote) => {
        const openStringNoteIndex = NOTES.indexOf(stringNote);
        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const noteOnFret = NOTES[(openStringNoteIndex + fret) % NOTES.length];
            if (scaleNotes.includes(noteOnFret)) {
                const fretElement = fretboardContainer.querySelector(`[data-string-note="${stringNote}"][data-fret="${fret}"]`);
                if (fretElement) {
                    const noteDiv = document.createElement('div'); noteDiv.className = 'note'; noteDiv.textContent = noteOnFret;
                    if (noteOnFret === selectedKey) { noteDiv.classList.add('root-note'); }
                    fretElement.appendChild(noteDiv);
                }
            }
        }
    });
}
function generateFretboard() {
    fretboardContainer.innerHTML = ''; GUITAR_TUNING.slice().reverse().forEach((stringNote) => {
        const stringDiv = document.createElement('div'); stringDiv.className = 'string';
        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const fretDiv = document.createElement('div'); fretDiv.className = 'fret'; fretDiv.dataset.fret = fret; fretDiv.dataset.stringNote = stringNote; stringDiv.appendChild(fretDiv);
        }
        fretboardContainer.appendChild(stringDiv);
    });
}
function getChordNotes(chordName) {
    const [rootNote, quality] = chordName.split(' '); const formula = CHORD_FORMULAS[quality]; if (!formula) return [];
    const rootIndex = NOTES.indexOf(rootNote); return formula.map(step => NOTES[(rootIndex + step) % NOTES.length]);
}
function highlightChordTones(chordName) {
    clearFretboard(); const chordNotes = getChordNotes(chordName); if (chordNotes.length === 0) return;
    const [root, third, fifth] = chordNotes;
    GUITAR_TUNING.slice().reverse().forEach((stringNote) => {
        const openStringNoteIndex = NOTES.indexOf(stringNote);
        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const noteOnFret = NOTES[(openStringNoteIndex + fret) % NOTES.length];
            if (chordNotes.includes(noteOnFret)) {
                const fretElement = fretboardContainer.querySelector(`[data-string-note="${stringNote}"][data-fret="${fret}"]`);
                if (fretElement) {
                    const noteDiv = document.createElement('div'); noteDiv.className = 'note';
                    if (noteOnFret === root) { noteDiv.textContent = 'R'; noteDiv.classList.add('root-note'); } else if (noteOnFret === third) { noteDiv.textContent = '3'; } else if (noteOnFret === fifth) { noteDiv.textContent = '5'; }
                    fretElement.appendChild(noteDiv);
                }
            }
        }
    });
}

// --- INTERACTIVE TOUR LOGIC ---

const tourSteps = [
    { elementId: 'key-select', text: 'First, choose your root note. This is the "home base" for your scale.' },
    { elementId: 'scale-select', text: 'Next, select a scale or mode to see all its notes on the fretboard.' },
    { elementId: 'fretboard-container', text: 'The fretboard shows every note in the scale. Click any note to hear its pitch!' },
    { elementId: 'chords-container', text: 'Here are the chords built from this scale. Click one to see its notes (Root, 3rd, 5th) on the fretboard.' },
];
let currentStep = 0;
function showTourStep(index) {
    const step = tourSteps[index];
    const targetElement = document.getElementById(step.elementId);
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    targetElement.classList.add('tour-highlight');
    tourText.textContent = step.text;
    tourCounter.textContent = `${index + 1} / ${tourSteps.length}`;
    const rect = targetElement.getBoundingClientRect();
    tourTooltip.style.top = `${rect.bottom + 15}px`;
    tourTooltip.style.left = `${rect.left + rect.width / 2}px`;
    tourTooltip.style.transform = 'translateX(-50%)';
    if (index === tourSteps.length - 1) { tourNextBtn.textContent = 'Finish'; } else { tourNextBtn.textContent = 'Next'; }
}
function startTour() {
    tourOverlay.classList.remove('hidden');
    tourTooltip.classList.remove('hidden');
    showTourStep(currentStep);
}
function endTour() {
    tourOverlay.classList.add('hidden');
    tourTooltip.classList.add('hidden');
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
}

// --- INITIALIZATION and EVENT LISTENERS ---
generateFretboard();
drawFretboardAndNotes();
keySelect.addEventListener('change', drawFretboardAndNotes);
scaleSelect.addEventListener('change', drawFretboardAndNotes);

// UPDATED: The tour is now only started by clicking the info icon
infoIcon.addEventListener('click', () => {
    currentStep = 0; // Reset tour to the first step
    startTour();
});

tourNextBtn.addEventListener('click', () => {
    currentStep++;
    if (currentStep < tourSteps.length) { showTourStep(currentStep); } else { endTour(); }
});

chordsDisplay.addEventListener('click', (event) => {
    const clickedChip = event.target.closest('.chord-chip');
    if (!clickedChip) return;
    if (clickedChip.classList.contains('active')) {
        clickedChip.classList.remove('active');
        drawFretboardAndNotes();
        return;
    }
    document.querySelectorAll('.chord-chip').forEach(chip => chip.classList.remove('active'));
    clickedChip.classList.add('active');
    const chordName = clickedChip.textContent;
    highlightChordTones(chordName);
});
fretboardContainer.addEventListener('mouseover', (event) => {
    const hoveredNote = event.target.closest('.note');
    if (!hoveredNote) return;
    const noteToHighlight = hoveredNote.textContent;
    fretboardContainer.querySelectorAll('.note').forEach(note => {
        if (note.textContent !== noteToHighlight) {
            note.classList.add('dimmed');
        }
    });
});
fretboardContainer.addEventListener('mouseleave', () => {
    fretboardContainer.querySelectorAll('.note.dimmed').forEach(note => {
        note.classList.remove('dimmed');
    });
});
fretboardContainer.addEventListener('click', (event) => {
    const clickedNote = event.target.closest('.note');
    if (!clickedNote) return;
    let noteName = clickedNote.textContent;
    if (['R', '3', '5'].includes(noteName)) {
        const fretElement = clickedNote.parentElement;
        const stringNote = fretElement.dataset.stringNote;
        const fret = parseInt(fretElement.dataset.fret);
        noteName = NOTES[(NOTES.indexOf(stringNote) + fret) % NOTES.length];
    }
    const audioFile = AUDIO_FILES[noteName];
    if (audioFile) {
        notePlayer.src = audioFile;
        notePlayer.load();
        notePlayer.play().catch(error => console.error("Audio play failed:", error));
    }
});

// REMOVED: The automatic tour start on the first visit is no longer needed
// if (!localStorage.getItem('fretlyTourCompleted')) {
//     startTour();
// }

