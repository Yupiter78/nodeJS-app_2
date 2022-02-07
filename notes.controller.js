const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.red(note.id), chalk.blue(note.title));
    });
}

async function removeNote(noteId) {
    const notes = await getNotes();
    const filteredNotes = notes.filter(({ id }) => noteId !== id);
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.bgRed(`Note with id:${noteId} was removed!`));
}

async function editNote({id, title}) {
    const notes = await getNotes();
    const newNotes = notes.map((note) => note.id === id ? {...note, title: title} : note);
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.bgYellow(`Note with id: ${id} was update`));
}

module.exports = {
    addNote,
    printNotes,
    removeNote,
    editNote
};
