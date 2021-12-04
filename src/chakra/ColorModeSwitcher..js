import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';

import { FaMoon, FaSun } from 'react-icons';

export const ColorModeSwitcher = props => {
    const { toggleColorMode } = useColorMode();
    const text = useColorMode('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const { size = 'md' } = props;

    return (
        <IconButton
            size={size}
            fontSize='lg'
            aria-label={`Toggle ${text} mode`}
            color='current'
            m='0'
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            {...props}
        />
    );
}