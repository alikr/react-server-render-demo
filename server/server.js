/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require('react-dom/server');
var Application = require("../client/client.js");

module.exports = function(req, scriptFilename) {

  var html = ReactDOMServer.renderToString(<Application url={req.url}/>);
  return ReactDOMServer.renderToString(
    <html>
      <head>
      <title>test</title>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{__html: html}} />
        <script src={scriptFilename}></script>
      </body>
    </html>
  );
}