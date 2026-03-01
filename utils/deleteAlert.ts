import { deleteNote } from '@/utils/noteUtils';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export function DeleteNote(note, onDelete) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
        'Delete note',
        'Are you sure you want to delete this note?',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteNote(note?.id, onDelete) }
        ]
    )
}