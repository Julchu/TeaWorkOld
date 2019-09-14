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
		return (
			<>
				<p>Welcome</p>
				<p>{this.state.data.banana}</p>
			</>
		);
	}
}

export default Index;
