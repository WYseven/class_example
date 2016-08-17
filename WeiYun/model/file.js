/**
 * fileModel.js
 */

'use strict';

const mongoose = require('mongoose');
const fileSchema = require('../schema/file');


let FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;