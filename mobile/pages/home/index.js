import React, { useEffect, useState, useRef } from 'react';

import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { Audio } from 'expo-av';

import styles from './style';

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [recentMusics, setRecentMusics] = useState([
    {
      "time": "4.09",
      "name": "Se Essa Bunda",
      "id": 1,
      "artist": "Costa Gold ft. Kawe",
      "art": "https://i.ytimg.com/vi/AwH-SuAIK-o/maxresdefault.jpg",
      "uri": "https://firebasestorage.googleapis.com/v0/b/system-music-60de5.appspot.com/o/Costa%20Gold%20-%20Se%20Essa%20Bunda%20ft.%20Kawe.mp3?alt=media&token=dd642197-8b28-4943-bfdd-0df7c636164a"
    },
    {
      "time": "2.12",
      "artist": "Hippie Sabotage",
      "name": "Devil Eyes",
      "id": 4,
      "art": "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/d/6/d/f/d6dfdf683215029e8ac85b7865c778ba.jpg",
      "uri": "https://firebasestorage.googleapis.com/v0/b/system-music-60de5.appspot.com/o/Hippie%20Sabotage%20-%20Devil%20Eyes.mp3?alt=media&token=26bd8fa7-d9e3-45be-86d4-88670291356e"
    },
    {
      "uri": "https://firebasestorage.googleapis.com/v0/b/system-music-60de5.appspot.com/o/Costa%20Gold%20-%20UAU!%20(Clipe%20Oficial).mp3?alt=media&token=c186888b-4950-41f0-bb6e-5273ee46e6ab",
      "id": 2,
      "art": "https://i.ytimg.com/vi/u0JXO5oZsyQ/maxresdefault.jpg",
      "name": "UAU!",
      "artist": "Costa Gold",
      "time": "3.17"
    },
    {
      "uri": "https://firebasestorage.googleapis.com/v0/b/system-music-60de5.appspot.com/o/Masked%20Wolf%20-%20Astronaut%20in%20the%20Ocean.mp3?alt=media&token=16171519-9360-440a-95c5-aeb528f2bbe7",
      "time": "2.12",
      "artist": "Masked Wolf",
      "art": "https://m.media-amazon.com/images/I/81pFOvWtu6L._SS500_.jpg",
      "id": 3,
      "name": "Astronaut in the Ocean"
    }
  ]);

  const sound = useRef(new Audio.Sound());  
  
  useEffect(() => {
    playSound();
  }, [loaded])

  const playSound = async () => {
    const result = await sound.current.getStatusAsync();
    if(result.isLoaded) {
      if (!result.isPlaying) {
        sound.current.playAsync();
        setPlaying(true);
      }
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
        //setDuration(getMillis(item.time));
      }
    }
  }

  const handleMusic = (uri) => {
    setSound(uri);
  }

  const itemlist = ({item}) => (
    <TouchableOpacity onPress={() => {handleMusic(item)}} name={item.art} style={styles.preview}>
      <Image
        style={styles.thumbnail}
        source={{uri:item.art}}
      ></Image>
      <Text style={styles.legend}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tocadas Recentemente</Text>
      <FlatList
        style={styles.list}
        data={recentMusics}
        horizontal={true}
        renderItem={itemlist}
        keyExtractor={item => item.uri}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}