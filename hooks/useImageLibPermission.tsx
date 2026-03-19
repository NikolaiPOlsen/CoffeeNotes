import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function useImagePermission() {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [images, setImages] = useState<string[]>([]);

    const openLibrary = async () => {
    if (!permission?.granted) {
        await requestPermission();
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const MAX_SIZE = 15 * 1024 * 1024;
      const file = new FileSystem.File(uri);
      const size = file.size;


      if (size !== undefined && size > MAX_SIZE) {
        Alert.alert("The file size is to large, please upload a file of smaller size.");
        return;
      }

      setImages(prev => [...prev, uri]);
      }
    }
    return { openLibrary, images, addImage: (uri: string) => setImages(prev => [...prev, uri]) }
}