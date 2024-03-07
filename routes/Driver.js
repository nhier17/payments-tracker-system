const express = require('express');
const router = express.Router();


router.route('/').post().get();
router.route('/:id').patch().get().delete();