import { DeleteNote } from '@/utils/deleteAlert';
import { BlurView } from 'expo-blur';
import { Dimensions } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const { SlideInMenu } = renderers;

export function NoteMenu({ children, note, onDelete, onEdit }) {
    return (
        <SafeAreaView>
            <Menu renderer={SlideInMenu}>
                <MenuTrigger>
                    {children}
                </MenuTrigger>

                <MenuOptions customStyles={{
                    optionsContainer: {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                    }, 
                    optionWrapper: {
                        padding: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
                        width: width * 1,
                    },
                    optionText: {
                        fontWeight: 'bold',
                        fontSize: width * 0.04,
                    }
    }}>
        <BlurView intensity={10} tint="light">
                    <MenuOption onSelect={onEdit} text='Edit' />
                    <MenuOption onSelect={() => DeleteNote(note, onDelete)} text='Delete' />
                    <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='' />
                    </BlurView>
                </MenuOptions>
            </Menu>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');