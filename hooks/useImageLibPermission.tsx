import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function useImagePermission() {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState<string | null>(null);

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
      setImage(result.assets[0].uri);

    }
    }
return { openLibrary, image };
}