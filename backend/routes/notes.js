const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes )
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
});

router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
});

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {}

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Authorized")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.send({ note })
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.send(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.send(401).send("UnAuthorized Aecess")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.send({note})

})

module.exports = router;