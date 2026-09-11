/**
 * protocols.js
 * Single source of truth for the 4 AWT protocols' presentation.
 * library.json only stores which protocol a category maps to (the "benefit"
 * field) — everything visual (color, icon, number) is looked up from here.
 */

const PROTOCOLS = {
    "Deep Reset": {
        number: "01",
        color: "#36d1ff",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3l7 3v6c0 4.5-3 7.3-7 9-4-1.7-7-4.5-7-9V6z"/></svg>'
    },
    "Cellular Repair": {
        number: "02",
        color: "#a78bfa",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41"/></svg>'
    },
    "Neuroplasticity": {
        number: "03",
        color: "#36d1b4",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/></svg>'
    },
    "Sleep Prep": {
        number: "04",
        color: "#ffb436",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>'
    }
};

// Fallback for any benefit name that doesn't match (keeps the app from breaking on a typo)
const DEFAULT_PROTOCOL = { number: "00", color: "#94a1c4", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/></svg>' };

function getProtocolMeta(benefitName) {
    return PROTOCOLS[benefitName] || DEFAULT_PROTOCOL;
}
