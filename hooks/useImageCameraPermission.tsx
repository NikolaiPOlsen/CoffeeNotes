import { CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function useCameraPermission() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');

  const openCamera = async () => {
    if (!permission?.granted) {
        await requestPermission();
        return;
    }
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    };
    return { openCamera }
}