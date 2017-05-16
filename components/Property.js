import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class Property extends React.Component {

  static navigationOptions = {
    title: 'Property',
  };

  constructor(props) {
    super(props);

    this.state = {
      property: props.navigation.state.params.property
    };
  }

  render() {

    let property = this.state.property;

    return(
      <View style={styles.container}>
        <Image source={{uri: property.img_url}} style={styles.image} />
        <Text style={styles.price}>{property.price_formatted}</Text>
        <Text style={styles.textContent}>{property.title}</Text>
        <Text style={styles.textContent}>{property.bedroom_number} bed flat, {property.bathroom_number} bathroom/s</Text>
        <Text style={styles.textContent}>{property.summary}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  textContent: {
    margin: 5
  },
  price: {
    fontSize: 20,
    color: 'blue',
    margin: 5
  },
  image: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height) / 2
  }
})
