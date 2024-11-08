let notes = JSON.parse(localStorage.getItem("savedNotes")) || [];
let currentNoteId = null;

function saveNote() {
    const noteText = document.getElementById("note-input").value.trim();
    if (noteText) {
        const note = { id: Date.now(), text: noteText, colorClass: getRandomColorClass() };
        notes.push(note);
        localStorage.setItem("savedNotes", JSON.stringify(notes));
        document.getElementById("note-input").value = "";
        renderStickyNotes();
    } else {
        alert("Please enter some text to save your note.");
    }
}

function getRandomColorClass() {
    const colors = ["color-1", "color-2", "color-3", "color-4"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function renderStickyNotes() {
    const container = document.getElementById("sticky-notes-container");
    container.innerHTML = "";
    notes.forEach(note => {
        const stickyNote = document.createElement("div");
        stickyNote.className = `sticky-note ${note.colorClass}`;
        stickyNote.textContent = note.text;
        stickyNote.onclick = () => openNoteModal(note.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-note";
        deleteBtn.textContent = "x";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteNoteById(note.id);
        };

        stickyNote.appendChild(deleteBtn);
        container.appendChild(stickyNote);
    });
}

function toggleSavedNotes() {
    const container = document.getElementById("sticky-notes-container");
    const button = document.getElementById("view-notes-button");
    if (container.style.display === "flex") {
        container.style.display = "none";
        button.textContent = "View Saved Notes";
    } else {
        container.style.display = "flex";
        button.textContent = "Hide Saved Notes";
        renderStickyNotes();
    }
}

function openNoteModal(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        currentNoteId = id;
        const modal = document.getElementById("note-modal");
        const modalContent = document.querySelector(".modal-content");
        const modalButtons = document.querySelector(".modal-buttons");
        const therapistBubble = document.querySelector(".therapist-bubble");

        // Clear previous color classes and add the selected note's color class
        modalContent.classList.remove("color-1", "color-2", "color-3", "color-4");
        modalButtons.classList.remove("color-1", "color-2", "color-3", "color-4");
        therapistBubble.classList.remove("color-1", "color-2", "color-3", "color-4");

        modalContent.classList.add(note.colorClass);
        modalButtons.classList.add(note.colorClass);
        therapistBubble.classList.add(note.colorClass);

        document.getElementById("modal-note-content").value = note.text;
        modal.style.display = "flex";

        // Add close button to modal's top-right corner
        if (!document.querySelector(".close-modal")) {
            const closeModalBtn = document.createElement("button");
            closeModalBtn.className = "close-modal";
            closeModalBtn.textContent = "x";
            closeModalBtn.onclick = closeNoteModal;
            modalContent.appendChild(closeModalBtn);
        }
    }
}

function saveEditedNote() {
    const newText = document.getElementById("modal-note-content").value;
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
        note.text = newText;
        localStorage.setItem("savedNotes", JSON.stringify(notes));
        closeNoteModal();
        renderStickyNotes();
    }
}

function deleteNoteById(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem("savedNotes", JSON.stringify(notes));
    renderStickyNotes();
}

function deleteNote() {
    if (currentNoteId) {
        deleteNoteById(currentNoteId);
        closeNoteModal();
    }
}

function toggleShared() {
    alert("This note has been shared with your therapist.");
}

function closeNoteModal() {
    const modal = document.getElementById("note-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalButtons = document.querySelector(".modal-buttons");
    const therapistBubble = document.querySelector(".therapist-bubble");

    modal.style.display = "none";
    modalContent.classList.remove("color-1", "color-2", "color-3", "color-4");
    modalButtons.classList.remove("color-1", "color-2", "color-3", "color-4");
    therapistBubble.classList.remove("color-1", "color-2", "color-3", "color-4");
    currentNoteId = null;
}

document.getElementById("note-modal").onclick = function(event) {
    if (event.target === this) closeNoteModal();
};
