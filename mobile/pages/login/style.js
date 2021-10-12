import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.15)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(89, 26, 214, .8)',
    marginTop: 10,
    borderRadius: 10,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    width: '70%',
    borderWidth: .5,
    borderRadius: 15,
    borderColor: 'rgba(0,0,0,.2)',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonGoogle: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 10,
    borderWidth: 1,
  },
  textButtonGoogle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});