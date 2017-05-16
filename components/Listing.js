import React from 'react';
import {
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import axios from 'axios';

const URL = 'https://api.nestoria.in/api';

export default class Listing extends React.Component {

  static navigationOptions = {
    title: 'Listings near your location',
  };

  constructor(props) {
    super(props);

    this.state = {
      place: '',
      listings: [],
      loading: false
    };

    this.navigateToPropertyPage = this.navigateToPropertyPage.bind(this);
  }

  /*
   * Will get the listings for the place entered by the user, which
   * we got in the params from the search place.
   */
  componentWillMount() {

    let {placeName, countryCode} = this.props.navigation.state.params;

    this.setState({
      loading: true,
      totalRows: 0
    });

    axios.get(URL, {
      params: {
        encoding: 'json',
        action: 'search_listings',
        country: countryCode,
        listing_type: 'buy',
        place_name: placeName
      }
    }).then(response => {

      this.setState({
        listings: response.data.response.listings,
        totalRows: response.data.response.total_results,
        loading: false
      })
    }).catch(error => {
      ToastAndroid.show(
        'Something went wrong. Please try again later.',
        ToastAndroid.SHORT
      );
      this.setState({
        loading: false
      });

      console.log(error);
    });

  }

  /**
   * Will navigate to property profile page with the property object selected by the user
   * @param  {Object} property The property selected by the user
   * @return {void}
   */
  navigateToPropertyPage(property) {

    const {navigate} = this.props.navigation;

    navigate('Property', {
      property: property
    });
  }

  render() {

    if (this.state.loading) {
      return (
        <ActivityIndicator style={styles.loader} size="large" />
      )
    }

    if (!this.state.totalRows > 0) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No listings found in your area.</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        {this.state.listings.map((place, index) => {
          return (
            <TouchableNativeFeedback key={index} onPress={() => this.navigateToPropertyPage(place)}>
              <View style={styles.container}>
                <Image source={{uri: place.thumb_url}} style={styles.thumbnail} />
                <View style={styles.textContent}>
                  <Text style={styles.price}>{place.price_formatted}</Text>
                  <Text>{place.title}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  price: {
    fontSize: 20,
    color: 'blue'
  },
  textContent: {
    alignSelf: 'stretch',
    flex: 2,
    margin: 5
  }
});
