/**
 * Created by seven on 2017/4/9.
 */

var h = require('webpack-hot-middleware/client?noInfo=true&reload=true');

h.subscribe(function(){
    console.log(123)
})

