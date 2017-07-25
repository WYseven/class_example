/**
 * Created by wangyun on 17/2/5.
 */

var foo = require("./src/foo");

import styles from './src/css/tools.css';

console.log(styles.abc);

require("./src/sass/a.sass");

require("./src/css/index.css");

//import foo form './src/foo'

box.innerHTML = foo.fooTest+"<div class='"+styles.abc+"'>123</div>";



