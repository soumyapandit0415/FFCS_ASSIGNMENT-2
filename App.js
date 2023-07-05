import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }))
      .catch((error) => this.setState({ error: error }));
  };
  postData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }))
      .catch((error) => this.setState({ error: error }));
  };
  putData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }))
      .catch((error) => this.setState({ error: error }));
  };
  deleteData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }))
      .catch((error) => this.setState({ error: error }));
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="GET Data" onPress={this.getData} />
        <Button title="POST Data" onPress={this.postData} />
        <Button title="PUT Data" onPress={this.putData} />
        <Button title="DELETE Data" onPress={this.deleteData} />
        <Text>Data: {JSON.stringify(this.state.data)}</Text>
        <Text>Error: {JSON.stringify(this.state.error)}</Text>
      </View>
    );
  }
}

export default App;