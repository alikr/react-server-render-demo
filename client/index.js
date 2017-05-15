var React = require("react");
import { render } from 'react-dom';
var Component = React.Component;

class Application extends Component{
	constructor(){
		super();
		this.handle = this.handle.bind(this);
	}
	handle(){
		alert(1);
	}
	render(){
		return (
			<div>
				<button onClick={this.handle}>alert</button>
			</div>
		);
	}
}

render(
	<Application></Application>,
	document.getElementById('app')
)