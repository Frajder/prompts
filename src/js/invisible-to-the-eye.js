// DOM Elements
const invisibleTextarea = document.getElementById('invisible-text');
const visibleTextarea = document.getElementById('visible-text');
const copyInvisibleBtn = document.getElementById('copy-invisible');
const copyVisibleBtn = document.getElementById('copy-visible');
const errorNotification = document.getElementById('error-notification');
const successNotification = document.getElementById('success-notification');

// Constants
const UNICODE_TAG_START = 0xE0000;

// Convert visible text to invisible Unicode tags
function convertToInvisible(text) {
    return Array.from(text)
        .map(char => String.fromCodePoint(UNICODE_TAG_START + char.codePointAt(0)))
        .join('');
}

// Convert invisible Unicode tags back to visible text
function convertToVisible(text) {
    return Array.from(text)
        .map(char => {
            const codePoint = char.codePointAt(0);
            if (codePoint < UNICODE_TAG_START) return char;
            return String.fromCodePoint(codePoint - UNICODE_TAG_START);
        })
        .join('');
}

// Check if text contains only invisible Unicode tags
function isValidInvisibleText(text) {
    return Array.from(text).every(char => {
        const codePoint = char.codePointAt(0);
        return codePoint >= UNICODE_TAG_START || char === '\n';
    });
}

// Show notification
function showNotification(element, duration = 5000) {
    element.classList.remove('hidden');
    setTimeout(() => {
        element.classList.add('hidden');
    }, duration);
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(successNotification);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
}

// Update button states
function updateButtonStates() {
    copyInvisibleBtn.disabled = !invisibleTextarea.value;
    copyVisibleBtn.disabled = !visibleTextarea.value;
}

// Event Listeners
invisibleTextarea.addEventListener('input', (e) => {
    const text = e.target.value;
    if (!isValidInvisibleText(text)) {
        showNotification(errorNotification);
        e.target.value = e.target.value.slice(0, -1);
        return;
    }
    visibleTextarea.value = convertToVisible(text);
    updateButtonStates();
});

visibleTextarea.addEventListener('input', (e) => {
    invisibleTextarea.value = convertToInvisible(e.target.value);
    updateButtonStates();
});

copyInvisibleBtn.addEventListener('click', () => {
    copyToClipboard(invisibleTextarea.value);
});

copyVisibleBtn.addEventListener('click', () => {
    copyToClipboard(visibleTextarea.value);
});

// Initialize button states
updateButtonStates(); 