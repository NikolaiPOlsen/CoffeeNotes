import React from 'react';
import { Colors } from '@/constants/colors';
import useCameraPermission from '@/hooks/useCameraPermission';
import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';


export default function CameraModal({ visible, onClose, cameraRef, onPhoto }: { visible: boolean; onClose: () => void; cameraRef: React.RefObject<CameraView | null>; onPhoto: (uri: string) => void }) {
    const { openCamera, facing } = useCameraPermission();

    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync();
        if (photo?.uri) {
            onPhoto(photo.uri);
            onClose();
        }
    }

    return (
        <Modal animationType='slide' visible={visible} onRequestClose={onClose}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}/>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Ionicons name='refresh' size={width * 0.1} color={Colors.white}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Ionicons name='camera' size={width * 0.1} color={Colors.white}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Ionicons name='close' size={width * 0.1} color={Colors.white}/>
            </TouchableOpacity>
            </View>
        </Modal>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: width * 1,
    bottom: height * 0.05,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});