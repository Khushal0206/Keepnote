const router = require('express').Router()
const auth = require('../middleware/auth')
const noteCtrl = require('../controller/noteController')

router.route('/getAllNote').get(auth, noteCtrl.getNotes)
router.route("/createNote").post(auth, noteCtrl.createNote)

router.route('/getNote/:id').get(auth, noteCtrl.getNote)
router.route('/updateNote/:id').patch(auth, noteCtrl.updateNote)
router.route('/deleteNote/:id').delete(auth, noteCtrl.deleteNote)


module.exports = router