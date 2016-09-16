import React from 'react';
import ReactDOM from 'react-dom';
require('./drag.css');


class Drag extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div 
        		ref="drags"
        		className="drag"
        		onMouseDown = {this.downFn}
        	   ></div>;
    }

    componentWillMount (){
    	console.log("开始");
    }
    componentDidMount (){
    	/*var drag = document.getElementsByClassName("drag")[0];

    	drag.onmousedown = function (ev){
    		document.onmousemove = function (ev){
    			console.log( ev.clientX );
    			drag.style.left = ev.clientX + 'px';	
    		};
    	};*/
    }

    downFn(ev) {
    	console.log( this.drags );
    }
}

export default Drag;
