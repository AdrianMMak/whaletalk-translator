# Whale Talk

A static web page that "translates" a phrase into whale language by extracting vowels and playing back matching whale sounds. Built as a Grade 11 CS class project exploring string manipulation and array traversal in JavaScript. (originally on Replit).

## How it works

- Choose one of three dialects (Whale, Humpback, Blue Whale), each using a different vowel/character matrix.
- Enter a phrase; the translator extracts the matching characters and displays the result.
- Hit **Listen** to hear the translation played back as whale sound clips.
- **View History** shows your last several translations; **Clear History** resets it.

## Running locally

This is a plain static site (no build step, no backend). Open [index.html](index.html) directly in a browser, or serve the folder with any static file server, e.g.:

```
npx serve .
```

## Files

- `index.html` / `style.css` — page structure and styling
- `script.js` — translation logic, dialect handling, sound playback, history
- `WhaleSounds/` — whale sound clips used for playback
- `Socials Logos/` — footer icons

## Credits

Adrian Mak (JS), Xavier Van Straalen (HTML/CSS), Jacob Bergerhoff (HTML/CSS/JS)
