const Notes = require('../model/noteModal')

const noteCtrl = {
    getNotes: async (req, res) =>{
        try {
            const notes = await Notes.find({user_id: req.user._id})
            res.json(notes)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createNote: async(req, res,next) =>{
        try {
            const {title, content, date} = req.body;
            console.log(title)
            console.log(content)
            console.log(date)

            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user._id,
                name: req.user.username
            })
            await newNote.save()
            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            res.json({msg: "Updated a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNote: async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = noteCtrl