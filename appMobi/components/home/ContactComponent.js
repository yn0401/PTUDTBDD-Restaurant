import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Divider, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
class Contact extends Component {
  
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 15}}>Contact information</Text>
            <Divider style={{paddingTop: 10}}/>
            <Text style={{ margin: 5}}>88, Pham Van Dong, Thu Duc</Text>
            <Text style={{ margin: 5}}>NHA HANG HOANG GIA</Text>
            <Text style={{ margin: 5}}>VIET NAM </Text>
            <Text style={{ margin: 5}}>Hotline: 08 8888 8888</Text>
            <Text style={{ margin: 5}}>Huynh Thanh Ngan</Text>
            <Text style={{ margin: 5}}>Email:Nhahanghoanggia@.com.vn</Text>
            <Button title=' Send Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail} />
      </Card>
      </Animatable.View>
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['huynhthanhngan@gmail.com'],
      subject: 'From Huynh Thanh Ngan - 08 8888 8888',
      body: 'Type ...'
    });
  }
}
export default Contact;