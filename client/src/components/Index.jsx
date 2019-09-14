import React, { Component } from "react";
import axios from "axios";

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	async componentDidMount() {
		await axios.get("/api").then(res => {
			this.setState({
				data: res.data
			});
		});
	}

	render() {
		console.log(this.state.data);
		return (
			<>
				<p>Welcome</p>
				<p>{this.state.data}</p>
			</>
		);
	}
}

export default Index;
