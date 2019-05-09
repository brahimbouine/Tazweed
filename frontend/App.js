import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, TouchableHighlight, Image, } from 'react-native';
import axios from 'axios';
import { CheckBox, Button } from 'react-native-elements'

export default class App extends React.Component {
  state = {
    items: [],
    selectedCheckbox: [], // keep selected item in state, by default its empty meaning nothing is selected
    checked: false,
    Total: 0
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/GetItems')
      .then(res => {
        this.setState({ items: res.data.Items })
      }
      );

  }
  sendOrder() {
    axios.post('http://localhost:3001/api/AddOrder', this.state.selectedCheckbox)
      .then(res => {
        this.setState({ items: res.data.Items })
        alert(' your order send successful, Tahnk you')
      }
      );
  }
  addItem(item) {
    if (this.state.selectedCheckbox.indexOf(item.id) === -1) {
      console.log(1)
      var data = this.state.selectedCheckbox.concat(item.id);
      var Total = this.state.Total + parseInt(item.price)
      this.setState({ selectedCheckbox: data, Total: Total })
    }
    console.log(this.state.selectedCheckbox)
  }
  check(item) {
    this.state.list.find((i) => { console.log(item.id); return i == item.id })
  }
  CheckMe = selectedCheckbox => {
    this.setState({ selectedCheckbox }); // update selected item
  };
  render() {
    return (
      <View style={{ flex: 1 }} >
        <View style={styles.logo} ><Image style={styles.image} source={require('./assets/logo.png')} /></View>
        <View style={styles.container}>
          <FlatList
            data={this.state.items}
            renderItem={({ item, separators }) => (
              <TouchableHighlight
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <CheckBox
                  title={`${item.name}, Price: ${item.price} QAR`}
                  key={item.id}
                  checked={item.id === this.state.selectedCheckbox.id} // for current element
                  onToggle={(value, index) => this.CheckMe(item)} // pass index of toggled element
                  onPress={() => this.addItem(item)}
                // iconType='material'
                // checkedIcon='clear'
                // uncheckedIcon='add'
                // checkedColor='red'
                />
              </TouchableHighlight>
            )}
          />
        </View>
        <View>
          <Text style={styles.total}>{`Total Order: ${this.state.Total} QAR`}</Text>
          <Button
            onPress={this.sendOrder()}
            title="Send Order"
            titleStyle={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}
            linearGradientProps={{
              colors: ['#FFD700', 'white'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  logo: {
    marginTop: 20,
    marginBottom: 1,
    alignItems: 'center',
    // backgroundColor:'#FFD700'
  },
  image: {
    marginRight: 10,
    marginTop: 20,
    justifyContent: 'center',
    padding: 10,
    width: 180, height: 100


  },
  item: {
    backgroundColor: 'white',
    borderBottomColor: '#A2A0A0',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 20
  },
  container: {
    marginTop: 1,
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22
  },

});

