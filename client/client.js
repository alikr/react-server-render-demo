var React = require("react");
var Component = React.Component;

class Application extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div className="application">
				<h1>Hello World</h1>
				<pre>{JSON.stringify(this.props)}</pre>
				<div id="app"></div>
			</div>
		);
	}
}

module.exports = Application;