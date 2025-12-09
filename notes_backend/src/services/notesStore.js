const { randomUUID } = require('crypto');

/**
 * Simple in-memory notes store.
 * Note shape: { id: string, title: string, content?: string, createdAt: ISOString, updatedAt: ISOString }
 */
class NotesStore {
  constructor() {
    this.notes = [];
  }

  // PUBLIC_INTERFACE
  create({ title, content = '' }) {
    /** Create a note with title and optional content */
    const now = new Date().toISOString();
    const note = {
      id: randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.push(note);
    return note;
  }

  // PUBLIC_INTERFACE
  list() {
    /** List all notes */
    return this.notes.slice();
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Get a note by id */
    return this.notes.find((n) => n.id === id) || null;
  }

  // PUBLIC_INTERFACE
  update(id, { title, content }) {
    /** Update a note by id. Only provided fields are updated. */
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    const existing = this.notes[idx];
    const updated = {
      ...existing,
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
      updatedAt: new Date().toISOString(),
    };
    this.notes[idx] = updated;
    return updated;
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Delete a note by id. Returns true if deleted. */
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx === -1) return false;
    this.notes.splice(idx, 1);
    return true;
  }

  clearAll() {
    // For potential tests/future use
    this.notes = [];
  }
}

module.exports = new NotesStore();
