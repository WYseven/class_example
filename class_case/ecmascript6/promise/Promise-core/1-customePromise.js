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

			// 收集成功状态要执行的函数
			this.resolvedArr = [];
			// 收集失败状态要执行的函数
			this.rejectedArr = [];

			this._handler(func)
		}
		// 接收外部传入的函数，调用外部传入的函数
		_handler(func){
			let done = false; // 就是让函数值执行一次
			func((value) => {
				if(done) return;
				done = true;
				console.log(value)
				this._resolve(value);
			},(error) => {
				if(done) return;
				done = true;
				this._reject(error);
			});
		}

		_resolve(value){
			// 把状态改为成功
			this._status = status.fulfilled;
			this._value = value;

			// 执行所有成功的函数
			this.resolvedArr.forEach(item => item(this._value))

		}
		_reject(error){
			// 把状态改为失败
			this._status = status.rejected;
			this._error = error;

			this.rejectedArr.forEach(item => item(this._error));
		}
		// 收集注册的成功状态或失败状态要执行的函数
		_done(resolvedFunc,rejectedFunc){
			//pending的时候收集
			resolvedFunc = typeof resolvedFunc === 'function' 
							? resolvedFunc : null;
			rejectedFunc = typeof rejectedFunc === 'function' 
							? rejectedFunc : null;

			// 收集
			if(this._status === 0){
				if(resolvedFunc) this.resolvedArr.push(resolvedFunc);
				if(rejectedFunc) this.rejectedArr.push(rejectedFunc);
			}else if(this._status === 1 && resolvedFunc){ // 直接执行
				resolvedFunc(this._value);
			}else if(this._status === 2 && rejectedFunc){
				rejectedFunc(this._error);
			}
		}

		// 收集注册的成功状态或失败状态要执行的函数
		then(resolvedFunc,rejectedFunc){
			this._done(resolvedFunc,rejectedFunc)
		}
	}

	window.CustomePromise = CustomePromise;

})();