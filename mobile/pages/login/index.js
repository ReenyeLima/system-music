import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from 'expo-google-app-auth';

import md5 from 'md5';

import config from '../../config/config'

import styles from './style';

const logoGoogle = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png";

export default function Index({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=> {
    reset();
    getToken();
  }, []);

  const reset = async () => {
    await AsyncStorage.setItem('userId', "");
    await AsyncStorage.setItem('token', "");
  }

  const getToken = async () => {
    let token = await AsyncStorage.getItem('userId');
    if(token !== null && token !== undefined && token !== "") navigation.navigate("Home");
  }

  const handleLogin = async () => {
    const user = {
      "email":email,
      "password":md5(password),
    };
    
    const response = await fetch('http://192.168.248.107:3333/auth',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    if(response.status != 401) {
      const data = await response.json();

      if(data.auth) {
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('token', data.token);
        
        navigation.navigate("Home");
      }
    }
  }

  const handleLoginGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.configAuth.client_id,
        iosClientId: config.configAuth.client_ios_id,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        let data = await saveUser({
          "name":result.user.name,
          "email":result.user.email,
          "password":md5(result.user.id),
        });

        if(data !== "") {
          await AsyncStorage.setItem('userId', data.id);
          await AsyncStorage.setItem('token', data.token);
          navigation.navigate("Home");
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const saveUser = async (user) => {
      const response = await fetch('http://192.168.248.107:3333/user',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      const json = await response.json();
      
      if(response.status == 200) {
        return json;
      }
      return "";
  }
 
  return (
      <View style={styles.container}>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(val) => { setEmail(val) }}
          placeholder="E-mail"
        />      
        <TextInput  
          value={password} 
          style={styles.input}
          onChangeText={(val) => { setPassword(val) }}
          secureTextEntry={true}
          placeholder="Senha"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.textButton}>Conecte-me</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.buttonGoogle} onPress={handleLoginGoogle}>
          <Image source={{uri:logoGoogle}} style={{width: 30, height: 30}} />
          <Text style={styles.textButtonGoogle}>Login usando Google</Text>
        </TouchableOpacity>
      </View>
  );
}