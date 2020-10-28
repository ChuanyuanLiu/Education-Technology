import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useRole = () => {
    const { user, isLoading } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        roles: null,
    });

    useEffect(() => {
        (async () => {
            try {
                if (user === undefined) return;
                const url = `https://localhost:3001/user/roles?user_id=${user.sub}`;
                const res = await fetch(url);

                setState({
                    ...state,
                    roles: await res.json(),
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