// Save note to localStorage
function saveNote() {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();

    if (noteText) {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
        savedNotes.push({ id: Date.now(), text: noteText, shared: false });
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

        noteInput.value = "";
        viewSavedNotes();
    }
}

// View or hide saved notes
function toggleSavedNotes() {
    const button = document.getElementById("view-notes-button");
    const container = document.getElementById("sticky-notes-container");

    if (container.style.display === "flex") {
        container.style.display = "none";
        button.textContent = "View Saved Notes";
    } else {
        viewSavedNotes();
        container.style.display = "flex";
        button.textContent = "Hide Saved Notes";
    }
}

// Display saved notes as sticky notes
function viewSavedNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    const container = document.getElementById("sticky-notes-container");

    container.innerHTML = "";
    savedNotes.forEach((note) => {
        const stickyNote = document.createElement("div");
        stickyNote.className = `sticky-note color-${(note.id % 4) + 1}`;
        stickyNote.textContent = note.text.slice(0, 100); // Short preview

        stickyNote.onclick = () => openNoteModal(note);
        container.appendChild(stickyNote);
    });
}

// Open modal to view/edit a saved note
function openNoteModal(note) {
    const modal = document.getElementById("note-modal");
    const modalContent = document.getElementById("modal-note-content");
    const shareCheckbox = document.getElementById("share-note-checkbox");

    modal.style.display = "flex";
    modalContent.value = note.text;
    shareCheckbox.checked = note.shared;

    document.getElementById("edit-note-button").onclick = () => saveEditedNote(note.id);
    document.getElementById("delete-note-button").onclick = () => deleteNoteAndClose(note.id);
    document.getElementById("close-modal-button").onclick = () => closeModal();
}

// Save edits to a note
function saveEditedNote(id) {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    const updatedText = document.getElementById("modal-note-content").value;
    const shareCheckbox = document.getElementById("share-note-checkbox");

    const noteIndex = savedNotes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
        savedNotes[noteIndex].text = updatedText;
        savedNotes[noteIndex].shared = shareCheckbox.checked;
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        viewSavedNotes();
        closeModal();
    }
}

// Delete note and close modal
function deleteNoteAndClose(id) {
    deleteNote(id);
    closeModal();
}

// Delete a note from localStorage
function deleteNote(id) {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    viewSavedNotes();
}

// Close modal
function closeModal() {
    document.getElementById("note-modal").style.display = "none";
}

// Toggle view notes on button click
document.getElementById("view-notes-button").onclick = toggleSavedNotes;
document.getElementById("save-note-button").onclick = saveNote;
