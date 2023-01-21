import React from 'react';
import { View, Text } from 'react-native';
import { Grid, Col } from 'native-base';


export const Layout = () => {

  return (
    <View style={{ flex: 1 }}>
      <Grid style={{ flex: 1, flexWrap: 'wrap' }}>
        {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Iceberry', 'Jackfruit'].map((fruit, index) => (
          <Col key={index} style={{ width: '25%' }}>
            <Text>{fruit}</Text>
          </Col>
        ))}
      </Grid>
    </View>
  );
};


