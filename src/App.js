import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
	Button
} from 'react-native';
import './App.css';

class App extends Component {
  state = {
		data_list: [],
		error: null
	}

	fetchData = async() => {
		try {
			const req_payload = await fetch('http://127.0.0.1:8000/api/company');
			const data = await req_payload.json();
			this.setState({
				data_list: data.results,
				error: null
			});
		} catch(err){
			console.warn(err);
			this.setState({
				error: {
					stack: err,
					message: err.toString()
				}
			});
		}
	}

	handleChange = e => this.fetchData();

  render() {
		return(
			<View className='container'>
				<Text className='title row'>Create React Native App</Text>
				<View className='row button'>
					<Button style={styles.button} onPress={this.handleChange} title="Fetch Data"/>
				</View>
				<Text className='row output'>
						{
							this.state.error !== null ?
								<Text style={styles.error}>{this.state.error.message}</Text> :
									(this.state.data_list.length > 0 ? JSON.stringify(this.state.data_list) : '')
						}
				</Text>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	error: {
		color: '#ff3b3b',
		fontSize: 'calc(8px + 2vmin);',
	},
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
