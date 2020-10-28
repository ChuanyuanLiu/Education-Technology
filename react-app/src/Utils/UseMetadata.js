import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useMetadata = () => {
    const { user, isLoading } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        metadata: null,
    });

    useEffect(() => {
        (async () => {
            try {
                if (user === undefined) return;
                const url = `https://139.99.155.172:3001/user?user_id=${user.sub}`;
                const res = await fetch(url);
                const fullUser = await res.json();

                setState({
                    ...state,
                    metadata: fullUser[0].user_metadata,
                    error: null,
                    loading: false,
                });
            } catch (e) {
                console.error(e);
                setState({
                    ...state,
                    error: e,
                    loading: true,
                });
            }
        })();
    }, [user]);

    return({
        ...state,
    });
};