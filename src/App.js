import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
	Button
} from 'react-native';
import './App.css';

export default () => {
	const [data_list, setDataList] = useState([]);
	const [error, setError] = useState(null);

	const curryPipe = (...fn) => fn.reduce((f, g) => (...a) => g(f(...a)));

	const fetchData = async() => {
		try {
			const req_payload = await fetch('http://localhost:8000/api/companies', { mode: 'no-cors', safe: 'False' });
			console.log(req_payload);
			const data = await JSON.stringify(req_payload);
			console.log('data', data);
			curryPipe(setError(error), setDataList(data_list));
			console.log(error, data_list);
		} catch(err){
			console.warn(err);
			curryPipe(
				setError({
					stack: err,
					message: err.toString()
				}),
				setDataList(data_list)
			);
		}
	}
	return(
		<View className='container'>
			<Text className='title row'>Create React Native App</Text>
			<View className='row button'>
				<Button style={styles.button} onPress={fetchData} title="Fetch Data"/>
			</View>
			<Text className='row output'>
					{
						error !== null ?
							<Text style={styles.error}>{error.message}</Text> :
								(data_list.length > 0 ? data_list : 'Click to load data!')
					}
			</Text>
		</View>
	);
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
