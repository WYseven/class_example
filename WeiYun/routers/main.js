/**
 * routers/main
 * zmouse@vip.qq.com
 */

'use strict';

const express = require('express');
const router = express.Router();
const FileModel = require('../model/file');

const multer  = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})

let upload = multer({
	dest: 'uploads/',
	storage: storage
})

router.post('/upload', upload.single('file'), (req, res, next) => {
	res.send('ok')
})

let files = [];

refreshData();

/**
 * 首页
 */
router.get('/', (req, res, next) => {
	res.render('index.html');
});

/**
 * 新建目录/文件夹
 * url: /createFolder
 * method: GET
 * data: 
 * 		pid <String> 父级 ID
 * 		name <String> 文件夹名称
 */
router.post('/createFolder', (req, res, next) => {
	let pid = req.body.pid || null;
	let name = req.body.name;

	if (!name || name == '' || name.length > 100) {

		res.json({
			code: 1,
			message: '文件夹名字不能为空或者大于100个字符'
		});
	}

	if (pid) {
		let parentInfo = Tree.getById(pid);
		if (!parentInfo) {
			res.json({
				code: 2,
				message: '父级不存在'
			})
		}
	}

	let fileInfo = Tree.getByName(pid, name);
	if (fileInfo) {
		res.json({
			code: 3,
			message: '该目录下已经存在同名文件夹了'
		})
	}

	let fileModel = new FileModel();
	fileModel.pid = pid;
	fileModel.name = name;
	fileModel.type = 'folder';
	fileModel.save().exec().then(() => {
		refreshData().then(()=>{
			res.json({
				code: 0,
				message: '文件添加成功',
				data: Tree.getChildren(pid)
			})
		})
	});

});

/**
 * 获取指定文件夹下的数据
 */
router.get('/getData', (req, res, next) => {
	let pid = req.query.pid || null;

	let fileInfo = Tree.getById(pid);

	if (fileInfo && fileInfo.type != 'folder') {
		res.json({
			code: 1,
			message: '当前文件不是文件夹'
		})
	}

	res.json({
		code: 0,
		data: Tree.getChildren(pid)
	});
});

/**
 * 重命名
 */
router.post('/rename', (req, res, next) => {
	let id = req.body.id;
	let name = req.body.name;

	if (!id || !name) {
		res.json({
			code: 1,
			message: '无效参数'
		})
	}

	let fileInfo = Tree.getById(id);
	if (!id) {
		res.json({
			code: 2,
			message: '文件不存在'
		});
	}

	let fileInfo2 = Tree.getByName(id, name);

	if (fileInfo2) {
		res.json({
			code: 3,
			message: '该目录下已经存在同名文件夹了'
		})
	}

	FileModel.update({
		_id: id
	}, {
		name: name
	}, function(err) {
		if (err) {
			res.json({
				code: 3,
				message: '重命名失败'
			})
		}

		refreshData().then(()=>{
			res.json({
				code: 0,
				message: '重命名成功'
			})
		})
	});
});

/**
 * 获取所有子级数据
 */
router.get('/getTree', (req, res, next) => {

	let id = req.query.id || null;

	res.json({
		code: 0,
		data: Tree.getChildrenAll(id)
	})
});

/**
 * 移动
 */
router.get('/move', (req, res, next) => {

	let id = req.query.id;
	let pid = req.query.pid || null;

	let fileInfo = Tree.getById(id);

	if (!fileInfo) {
		res.json({
			code: 1,
			message: '要移动的文件/文件夹不存在'
		})
	}

	if (pid !== null) {
		let parentFileInfo = Tree.getById(pid);
		if (!parentFileInfo) {
			res.json({
				code: 2,
				message: '目标位置不存在'
			})
		}
		if (parentFileInfo.type !== 'folder') {
			res.json({
				code: 3,
				message: '目标位置不是文件夹'
			})
		}
	}

	if ( Tree.isChildren(pid, id) ) {
		res.json({
			code: 4,
			message: '目标位置是当前文件/文件夹的子文件'
		})
	}

	FileModel.update({
		_id: id
	}, {
		pid: pid
	}, function(err) {
		if (err) {
			res.json({
				code: 5,
				message: '移动失败'
			})
		}

		refreshData().then(()=>{
			res.json({
				code: 0,
				message: '移动成功'
			})
		})
	});

});


/**
 * 上传界面
 */
router.get('/upload', (req, res, next) => {
	res.render('upload.html');
})

/**
 * 上传文件
 */
/*router.post('/upload', upload.single('file'), (req, res, next) => {

	let pid = req.body.pid || null;

	if (pid) {
		let parentInfo = Tree.getById(pid);
		if (!parentInfo) {
			res.json({
				code: 1,
				message: '父级不存在'
			})
		}
	}

	FileModel.findOne({
		pid: pid,
		name: req.file.filename
	}).exec().then(fileInfo => {
		if (!fileInfo) {
			let fileModel = new FileModel();
			fileModel.pid = pid;
			fileModel.name = req.file.filename;
			fileModel.type = req.file.mimetype;
			fileModel.path = req.file.path;
			fileModel.size = req.file.size;
			return fileModel.save();
		}
		Promise.resolve();
	}).then(()=>{
		refreshData().then(()=>{
			res.json({
				code: 0,
				message: '文件添加成功',
				data: Tree.getChildren(pid)
			})
		})
	})

});*/


function refreshData() {
	return new Promise( (resolve, reject) => {
		FileModel.find().exec().sort({_id: -1}).then( (data => {
			files = [];
			for (var i = 0; i < data.length; i++) {
				files.push( data[i].toObject() );
			}
			resolve();
		}) ).catch(err => {
			next(err);
		});
	} );
}

const Tree = {
	getById: function(id) {
		for (var i = 0; i < files.length; i++) {
			console.log(files[i])
			if (files[i]._id.toString() == id) {
				return files[i];
			}
		}
		return null;
	},

	getByName: function(id, name) {
		for (var i = 0; i < files.length; i++) {
			if (files[i].pid == id && files[i].name == name) {
				return files[i];
			}
		}
		return null;
	},

	getChildren: function(id) {
		let children = [];
		for (var i = 0; i < files.length; i++) {
			if (files[i].pid == id) {
				children.push(files[i]);
			}
		}
		return children;
	},

	getChildrenAll: function(id, level) {
		let children = this.getChildren(id);
		let l = level || 0;
		let newChildren = [];
		for (let i=0; i<children.length; i++) {
			children[i]._level = l;
			newChildren.push(children[i]);
			let children2 = this.getChildrenAll( children[i]._id.toString(), l + 1 );
			if (children2.length) {
				newChildren = newChildren.concat(children2);
			}
		}
		return newChildren;
	},

	isChildren: function(id, pid) {
		let childrenAll = this.getChildrenAll(pid);
		if ( childrenAll.length ) {
			for (let i = 0; i < childrenAll.length; i++) {
				if (id == childrenAll[i]._id) {
					return true;
				}
			}
		}
		return false;
	}
}

module.exports = router;