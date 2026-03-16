import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

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
      setImages(prev => [...prev, result.assets[0].uri]);

    }
    }
    return { openLibrary, images, addImage: (uri: string) => setImages(prev => [...prev, uri]) }
}