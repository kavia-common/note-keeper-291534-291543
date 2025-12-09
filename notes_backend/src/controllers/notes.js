const notesStore = require('../services/notesStore');

class NotesController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a new note. Requires JSON body with 'title' (string). Optional 'content'. */
    const { title, content } = req.body || {};
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Title is required and must be a non-empty string',
      });
    }
    const note = notesStore.create({ title: title.trim(), content: content || '' });
    return res.status(201).json(note);
  }

  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all notes */
    const notes = notesStore.list();
    return res.status(200).json(notes);
  }

  // PUBLIC_INTERFACE
  getById(req, res) {
    /** Get a note by id */
    const { id } = req.params;
    const note = notesStore.getById(id);
    if (!note) {
      return res.status(404).json({ error: 'NotFound', message: 'Note not found' });
    }
    return res.status(200).json(note);
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update a note by id. Accepts 'title' (non-empty string) and/or 'content'. */
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          error: 'ValidationError',
          message: 'If provided, title must be a non-empty string',
        });
      }
    }

    const updated = notesStore.update(id, {
      title: title !== undefined ? title.trim() : undefined,
      content,
    });

    if (!updated) {
      return res.status(404).json({ error: 'NotFound', message: 'Note not found' });
    }
    return res.status(200).json(updated);
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    /** Delete a note by id */
    const { id } = req.params;
    const ok = notesStore.delete(id);
    if (!ok) {
      return res.status(404).json({ error: 'NotFound', message: 'Note not found' });
    }
    return res.status(204).send();
  }
}

module.exports = new NotesController();
