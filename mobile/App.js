import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import { Audio } from 'expo-av';

const playIcon = require('./assets/play.png');
const pauseIcon = require('./assets/pause.png');

export default function App() {
  const [listmusic, setListmusic] = useState();
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sound = useRef(new Audio.Sound());

  const getList = async () => {
    try {
      const response = await fetch('http://localhost:3333/music');
      const json = await response.json();
      setListmusic(json);
    }catch(err) {
      console.error(err.message);
    }
  }

  const setSound = async (uri) => {
    console.log(sound.current);
    
    const result = await sound.current.loadAsync({uri:uri}, {}, true);
   
    if (result.isLoaded === false) {
      setLoaded(false);
    }else {
      setLoaded(true);
    }
  }

  const playSound = async () => {
    const result = await sound.current.getStatusAsync();
    if(result.isLoaded) {
      if (!result.isPlaying) {
        sound.current.playAsync();
      }
    }
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    playSound();
  }, [loaded])

  const handlePlay = () => {
    
  }

  const handleMusic = (uri) => {
    setSound(uri);
  }

  const itemlist = ({item}) => (
    <View
      onClick={() => {handleMusic(item.uri)}}
    >
      <Image 
        style={styles.thumbnail}
        source={{uri:item.art}}
      ></Image>
    </View>
  )
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionadas Recentemente</Text>
      <FlatList
        data={listmusic}
        horizontal={true}
        renderItem={itemlist}
        keyExtractor={item => item.uri}
      ></FlatList>
      <Image onClick={handlePlay} style={styles.playButton} source={(playing) ? pauseIcon : playIcon}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545'
  },
  thumbnail: {
    width: '30vw',
    height: '30vw',
    objectFit: 'cover',
    boxShadow: '0 0 10px rgba(0,0,0,.5)',
    marginLeft: '2vw'
  },
  title: {
    color: '#FFF',
    margin: '2vw',
    fontSize: '1.35rem'
  },
  playButton: {
    width: '10vw',
    height: '10vw',
    margin: '5vw'
  }
});
