const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const note = new noteModel({
            noteTitle: req.body.content.noteTitle,
            noteDescription: req.body.content.noteDescription,
            priority: req.body.content.priority,
            dateAdded: req.body.content.dateAdded,
            dateUpdated: req.body.content.dateUpdated
        });

        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.send(notes);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    }
});

// Retrieve a single Note with noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.send(note);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving note."
        });
    }
});

// Update a Note with noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const note = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.content.noteTitle,
                noteDescription: req.body.content.noteDescription,
                priority: req.body.content.priority,
                dateAdded: req.body.content.dateAdded,
                dateUpdated: req.body.content.dateUpdated
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.send(note);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating note."
        });
    }
});

// Delete a Note with noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.send({
            message: "Note deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete note."
        });
    }
});

module.exports = noteRoutes;