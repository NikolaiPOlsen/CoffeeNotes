import { Text } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, } from 'react-native-popup-menu';

export function NoteMenu({ children }) {
    return (
        <Menu>
            <MenuTrigger>
                {children}
            </MenuTrigger>
            
            <MenuOptions>
            <MenuOption onSelect={() => alert(`Edit`)} text='Edit' />
            <MenuOption onSelect={() => alert(`Delete`)} >
                <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
            </MenuOptions>
        </Menu>
    )
}