import {Platform} from 'react-native';

export const useHeaderHeight = () => (Platform.OS === 'ios' ? 44 : 56);
