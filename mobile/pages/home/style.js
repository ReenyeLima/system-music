import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052107',
    fontFamily: 'Roboto',
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20,
  },
  preview: {
    width: 120,
    margin: 8,
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 5
  },
  legend: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 12,
  },
  list: {
    flexGrow: 0,
  }
})