function CustomEventFn(){
	this.listener = {};
}
CustomEventFn.prototype.addEvent = function (evName,evFn){

	if( typeof evName === "string" && typeof evFn === "function" ){
		if( typeof this.listener[evName] === "undefined" ){
			this.listener[evName] = [evFn];
		}else{
			this.listener[evName].push(evFn);
		}
	}
	return this;	
}
CustomEventFn.prototype.removeEvent = function (evName,evFn){
	if( typeof evName === "string" ){
		if( typeof this.listener[evName] !== "undefined" ){
			if( typeof evFn === "function" ){
				for( var i = 0; i < this.listener[evName].length; i++ ){
					if( typeof evFn === "function" && evFn === this.listener[evName][i] ){
						this.listener[evName].splice(i,1);
						i--;
					}
				}
			}else{
				delete this.listener[evName];
			}
			
		}
	}
	return this;	
}
CustomEventFn.prototype.fireEvent = function (evName,data){

	if( typeof evName === "string" ){
		if( typeof this.listener[evName] !== "undefined" ){
			for( var i = 0; i < this.listener[evName].length; i++ ){
				this.listener[evName][i](data);
			}
		}
	}
	return this;	
}