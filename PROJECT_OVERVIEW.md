PRESSUR™ Acoustic Wellness - MVP Overview
=========================================

Architecture & Logic
--------------------

The app is built as a **Decoupled SPA-lite (Single Page Application)**. It relies on a "Stateless" frontend that preserves state via `localStorage`. This ensures high performance, offline capability (PWA-ready), and zero database costs.

### Core Architecture

-   **Storage:** `localStorage` handles User Profiles, Favorites, and Session History.

-   **Session Management:** `js/session.js` acts as the global controller for login/logout and user-data retrieval.

-   **Audio Engine:** Powered by `WaveSurfer.js` for high-fidelity visualization and non-destructive audio manipulation.

### Page & Script Map

1.  **Index (`index.html`):** The gateway. Handles User creation and PIN authentication.

2.  **Categories (`categories.html`):** The library. Dynamically renders tracks from `js/library.json`. Handles category filtering and visual "Favorite" indicators.

3.  **Session (`session.html`):** The "Chamber."

    -   **Scrolling Visualizer:** Uses `minPxPerSec` to provide a detailed view of 20min+ tracks.

    -   **Media Session API:** Integrated for Bluetooth hardware control (Play/Pause/Metadata).

    -   **User-Bound Timer:** Logic is unique to the User ID, preventing session crossover.

Future Roadmap
--------------

-   **Web Bluetooth API:** Integration for "PRESSUR™ Sync" to control external chamber lighting and hardware.

-   **Heart Rate Monitor:** Integration of BLE pulse sensors to display real-time BPM and adjust track intensity.

-   **Muse EEG Integration:** Utilizing `muse.js` to monitor brainwave states:

    -   **Alpha (8--12 Hz):** Target for Relaxation tracks.

    -   **Beta (13--30 Hz):** Target for Concentration/Focus tracks.

    -   **Theta (4--7 Hz):** Target for Drowsiness/Deep Meditation.

-   **Analytics Page:** Converting stored `totalMinutes` and `sessions_completed` into visual progress charts.