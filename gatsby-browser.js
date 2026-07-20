import './src/styles/global.css';
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import "media-chrome";

// Initialize the highlight-code web component
// This is required for code highlighting to work on direct page loads (not just client-side navigation)
deckDeckGoHighlightElement();
