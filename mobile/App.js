import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import Slider from '@react-native-community/slider';

import { Audio } from 'expo-av';

const playIcon = require('./assets/play.png');
const pauseIcon = require('./assets/pause.png');

export default function App() {
  const [listmusic, setListmusic] = useState();
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [duration, setDuration] = useState(0);
  const [millis, setMillis] = useState(0);

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

  const setSound = async (item) => {
    let uri = item.uri;

    let load = true;

    if(sound.current._key !== null) {
      if(sound.current._key.src !== uri) {
        const ret = await sound.current.unloadAsync();
        setLoaded(false);
      }else {
        load = false;
      }
    } 
    
    if(load) {
      const result = await sound.current.loadAsync({uri:uri}, {shouldPlay: true}, true);
      
      if (result.isLoaded === false) {
        setLoaded(false);
      }else {
        setLoaded(true);
        setPlaying(true);
        setDuration(getMillis(item.time));
      }
    }
  }

  const playSound = async () => {
    const result = await sound.current.getStatusAsync();
    if(result.isLoaded) {
      if (!result.isPlaying) {
        sound.current.playAsync();
        setPlaying(true);
      }
    }
  }

  const pauseSound = async () => {
    const result = await sound.current.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying) {
        sound.current.pauseAsync();
        setPlaying(false);
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
    //console.log(sound.current._key.currentTime = 28.544063)
    if(playing) {
      pauseSound();
    }else {
      playSound();
    }
  }

  function getMillis(duration) {
    return parseFloat(duration)*60;
  }

  const handleMusic = (uri) => {
    setSound(uri);
  }

  const itemlist = ({item}) => (
    <View
      onClick={() => {handleMusic(item)}}
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
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={(duration === 0) ? 1 : duration}
        value={millis}
        onValueChange={(e) => {
          if(e !== NaN) sound.current._key.currentTime = e.toFixed(6);
        }}
      />
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
