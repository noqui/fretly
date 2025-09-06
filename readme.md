# Fretly - An Interactive Guitar Scale Visualizer 🎸

Fretly is a sleek, modern web application designed to help guitarists of all levels visualize musical scales, modes, and their corresponding chords directly on an interactive fretboard. This project was built to transform abstract music theory into a practical, hands-on learning tool.

**Live Demo:** `[https://noqui.github.io/fretly/]`

## Core Features

Fretly is more than just a static chart; it's an interactive musical companion packed with features to enhance learning and creativity.

* **Complete Scale & Mode Library:** Instantly visualize a wide range of common scales (Major, Minor, Pentatonics) and all seven musical modes on a full 24-fret neck.

* **Interactive Note Highlighting:** Hover over any note to instantly see every other occurrence of that same note across the entire fretboard, helping to master note positions.

* **Audio Feedback:** Click on any note to hear its corresponding pitch, connecting the visual patterns on the fretboard with the sounds they produce.

* **AI-Powered "Chord Buddy":** The app uses its knowledge of music theory to automatically calculate and display all the diatonic chords that belong to the selected key and scale.

* **Chord Tone Highlighting:** Click on a chord chip to isolate its notes (**Root, 3rd, 5th**) on the fretboard, a powerful tool for understanding soloing and improvisation.

* **Engaging UI & Fun Content:** Each scale is paired with a humorous one-liner and a list of famous guitarists known for using that scale, making learning fun and relatable.

## Tech Stack

This project was built from the ground up with a focus on clean, vanilla web technologies, demonstrating strong foundational skills.

* **HTML5:** For the core structure and accessibility.

* **CSS3:** For the modern, minimalist, and responsive design, utilizing CSS Grid for the fretboard layout and custom properties (variables) for dynamic styling.

* **JavaScript (ES6+):** For all the application's intelligence, including:
  * The music theory engine that calculates scales and chords.
  * Dynamic generation of the fretboard and its notes.
  * Handling all user interactions and real-time updates to the UI.

## How It Works

The "AI" of Fretly is a client-side music theory engine built in JavaScript.

1.  **Music Theory Data:** The script holds data for the 12 chromatic notes, scale/mode formulas (as a series of steps), and chord formulas.

2.  **Dynamic Generation:** On page load, the JavaScript dynamically builds the entire 24-fret fretboard in the DOM.

3.  **Real-Time Calculation:** When a user selects a key or a scale, the script instantly calculates all the notes in that scale and their positions on the fretboard. It also calculates the corresponding diatonic chords.

4.  **Interactive Updates:** Event listeners attached to the controls, fretboard, and chord chips trigger functions that update the UI in real-time, from re-drawing the notes to playing audio.

This client-side approach makes the application incredibly fast and responsive, with zero loading time for new calculations.

## Future Ideas

This project has a strong foundation that can be expanded with even more innovative features, such as:

* **Generative Chord Progressions:** Suggesting common 4-chord loops for songwriting.
* **Alternate Tunings:** Allowing users to switch to Drop D, DADGAD, and more.
* **A "Lick Analyzer" Mode:** A reverse-lookup tool where users can input notes and see which scales they fit into.

Enjoy exploring the fretboard!
