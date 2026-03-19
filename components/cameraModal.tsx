import { Colors } from '@/constants/colors';
import useCameraPermission from '@/hooks/useCameraPermission';
import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';


export default function CameraModal({ visible, onClose, onRetake, cameraRef, onPhoto }: { visible: boolean; onClose: () => void; onRetake: () => void; cameraRef: React.RefObject<CameraView | null>; onPhoto: (uri: string) => void }) {
    const { openCamera, facing } = useCameraPermission();
    const [previewUri, setPreviewUri] = useState<string | null>(null);

    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync();
        if (!photo?.uri) return;

        const MAX_SIZE = 15 * 1024 * 1024;
        const file = new FileSystem.File(photo.uri);
        const size = file.size;
        
        if (size !== undefined && size > MAX_SIZE) {
            Alert.alert("The file size is to large, please upload a file of smaller size.");
            return;
        }

        setPreviewUri(photo.uri);
        onClose();
    }
    const retake = () => {
        setPreviewUri(null);
        onRetake();
    }

    return (
        <>
            <Modal animationType='slide' visible={visible} onRequestClose={onClose}>
                <CameraView ref={cameraRef} style={styles.camera} facing={facing}/>
                <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={openCamera}>
                    <Ionicons name='camera-reverse-outline' size={width * 0.1} color={Colors.white}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Ionicons name='camera' size={width * 0.1} color={Colors.white}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Ionicons name='close' size={width * 0.1} color={Colors.white}/>
                </TouchableOpacity>
                
                </View>
            </Modal>

            <Modal animationType='slide' visible={!!previewUri} onRequestClose={() => setPreviewUri(null)}>
                <Image source={{ uri: previewUri ?? '' }} style={styles.preview} />

                <TouchableOpacity style={styles.closeButton} onPress={() => setPreviewUri(null)}>
                    <Ionicons name='close' size={width * 0.08} color={Colors.white}/>
                </TouchableOpacity>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={retake}>
                    <Ionicons name='refresh' size={width * 0.1} color={Colors.white}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (previewUri) {
                    onPhoto(previewUri);
                    setPreviewUri(null);
                    }}}>
                    <Ionicons name='checkmark-circle-outline' size={width * 0.1} color={Colors.white}/>
                </TouchableOpacity>
            </View>
            </Modal>
        </>
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
  preview: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});