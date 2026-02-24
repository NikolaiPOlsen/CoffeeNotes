import { HomeButton } from '@/components/appButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen( {navigation} ) {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
);

  //const clearStorage = async () => {
    //await AsyncStorage.clear();
    //setNotes([]);
  //}

  const getData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch(error) {
      console.log(error);
    }
  };
  const handleOnPress = (item) => {
    setSelectedNote(item);
    setModalVisible(true);
  }
  const renderedNote = ({ item }) => {
    return (
    <TouchableOpacity onPress={() => handleOnPress(item)} activeOpacity={0.7}>
        <View style={{ paddingLeft: 10, margin: 10 }}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: width * 0.04, marginTop: 5 }}>{item.noteMessage}</Text>
        </View>
    </TouchableOpacity>
    );
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Text style={styles.descriptiveText}>Notes:</Text>

      <FlatList style={{ flex: 1 }} data={notes} renderItem={renderedNote} keyExtractor={(item) => item.id.toString()}/>

    <View style={styles.pageSpace}>
      <HomeButton onPress={() => navigation.navigate("New Note")} label={"New Note"} ></HomeButton>
    </View>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={[styles.modalView, { paddingTop: height * 0.05,  paddingBottom: height * 0.05}]}>
          <Text style={styles.textDisplayTitle} >Title: {selectedNote?.title}</Text>
          <Text style={styles.textDisplayNote}>Message: {selectedNote?.noteMessage}</Text>
          <HomeButton onPress={() => setModalVisible(false)} label={"Back"} ></HomeButton>
        </View>
      </Modal>
    </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F4E1',
    flex: 1,
    flexDirection: 'column',
  },
  herotitle: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    fontSize: width * 0.04,
    textAlign: 'center'
  },
  descriptiveText: {
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: width * 0.05,
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  pressedButton: {
    opacity: 60
  },
  newNoteButton: {
    height: height * 0.06,
    width: width * 0.9,
    borderRadius: 15,
    borderColor: '#735530',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pageSpace: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#F7F4E1',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textDisplayTitle: {
    marginTop: height * 0.01,
    fontSize: width * 0.06,
    fontWeight: "bold", 
  },
  textDisplayNote: {
    fontSize: width * 0.05,
    marginTop: height * 0.001,
    flex: 1,
  }
  
});