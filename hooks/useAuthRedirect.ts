import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAuthRedirect = ({ navigation }: any) => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const tokens = useSelector((state: RootState) => state.auth.tokens);

    useEffect(() => {
        if (isAuthenticated && tokens.access) {
            navigation.navigate('WelcomeScreen');
        }
    }, [isAuthenticated, tokens, navigation]);
};