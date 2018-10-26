;(function(){

	const status = {
		pending: 0,
		fulfilled: 1,
		rejected: 2
	}

	class CustomePromise{
		constructor(func){
			// 初始状态
			this._status = status.pending;
			this._value = null;  // 记录resolve函数传入的参数
			this._error = null;  // 记录reject函数传入的参数

			// 合并在一起
			this.hanlders = [];  // [{resolvedFunc:,rejectedFunc}]

			this._handler(func)
		}
		// 判断value有没有then函数,并且拿出then函数
		_getThen(value){
			let type = typeof value;
			if(value && (type === 'object' || type === 'function')){
				let then;
				if(then = value.then){
					return then;
				}
			}

			return null;
		}
		// 接收外部传入的函数，调用外部传入的函数
		_handler(func){
			let done = false; // 就是让函数值执行一次
			func((value) => {
				if(done) return;
				done = true;

				// value有没有then函数
				let then = this._getThen(value);
				if(then){
					// 拿到对象的then之后，怎么知道这个promise对象完成了呢？
					// 在then函数上注册成功和失败函数就可以
					return this._handler(then.bind(value))
				}

				setTimeout(this._resolve.bind(this,value));
			},(error) => {
				if(done) return;
				done = true;
				// value有没有then函数
				let then = this._getThen(error);
				if(then){
					// 拿到对象的then之后，怎么知道这个promise对象完成了呢？
					// 在then函数上注册成功和失败函数就可以
					return this._handler(then.bind(error))
				}
				setTimeout(this._reject.bind(this,error));
			});
		}

		_resolve(value){
			// 把状态改为成功
			this._status = status.fulfilled;
			this._value = value;
			// 执行所有成功的函数
			this.hanlders.forEach(this._handleFunc.bind(this))
		}
		_reject(error){
			// 把状态改为失败
			this._status = status.rejected;
			this._error = error;

			this.hanlders.forEach(this._handleFunc.bind(this))
		}

		// 执行和收集函数
		_handleFunc(handle){
			// 收集
			if(this._status === 0){
				this.hanlders.push(handle);
			}else if(this._status === 1 && typeof handle.resolvedFunc === 'function'){ // 直接执行
				handle.resolvedFunc(this._value);
			}else if(this._status === 2  && typeof handle.rejectedFunc === 'function'){
				handle.rejectedFunc(this._error);
			}
		}

		// 收集注册的成功状态或失败状态要执行的函数
		// 返回一个promise对象
		then(resolvedFunc,rejectedFunc){
			//this._done(resolvedFunc,rejectedFunc)
			return new CustomePromise((resolve,reject) => {
				this._handleFunc(
					{
						resolvedFunc: (value) => {
							// resolvedFunc不是一个函数
							if(typeof resolvedFunc !== 'function'){
								return resolve(value);
							}
							resolve(resolvedFunc(value));
						},
						rejectedFunc : (error) => {
							if(typeof rejectedFunc !== 'function'){
								return reject(error);
							}
							reject(rejectedFunc(error))
						}
					}
				)
			})
		}
	}

	window.CustomePromise = CustomePromise;

})();