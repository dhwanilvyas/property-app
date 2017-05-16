import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';
import axios from 'axios';

export default class SearchPage extends React.Component {

  static navigationOptions = {
    title: 'Property finder',
  };

  constructor() {
    super();

    this.state = {
      placeName: '',
      location: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  /**
   * Get user's location based on his/her IP by calling ip-api service
   * @return {void}
   */
  getLocation() {

    this.setState({
      locationLoading: true
    });

    axios.get('http://ip-api.com/json').then(response => {
      this.setState({
        placeName: response.data.city,
        countryCode: response.data.countryCode,
        locationLoading: false
      });
    }).catch(error => {
      console.log(error);
      ToastAndroid.show(
        'Something went wrong. Please try again later.',
        ToastAndroid.SHORT
      );
      this.setState({
        locationLoading: false
      });
    })
  }

  /**
   * Will navigate to listings page with location entered by the user
   * @return {void}
   */
  navigate() {

    if (!this.state.placeName) {
      ToastAndroid.show(
        'Please enter a location',
        ToastAndroid.SHORT
      );
      return;
    }

    const {navigate} = this.props.navigation;

    navigate('Listing', {
      placeName: this.state.placeName
    });
  }

  /**
   * Will be triggered every time user enters something in the textbox, and will update the state
   * @param  {String} value The value entered by the user
   * @return {void}
   */
  handleInputChange(value) {
    this.setState({
      placeName: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Search for house to buy!</Text>
        <Text>Search by place-name, postcode or search near your location.</Text>
        <View style={styles.searchContainer}>
          <TextInput style={styles.input} onChangeText={this.handleInputChange} placeholder="Vadodara" value={this.state.placeName} />
          <Button title="Go" onPress={this.navigate} disabled={this.state.locationLoading} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Location" disabled={this.state.locationLoading} onPress={this.getLocation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 15,
    alignItems: 'stretch',
    alignContent: 'stretch',
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  input: {
    height: 50,
    flex:1
  },
});
