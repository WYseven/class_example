/* eslint-disable */
//require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')


hotClient.subscribe(function (event) {
  console.log("呵呵呵")
  if (event.action === 'reload') {
    //window.location.reload()
  }
})
