import { useEffect, useState } from 'react';
import { useAuth0 } from 'Utils/UseAuth';

export const useRole = () => {
    return { error: null, roles: "Senior Consultant", loading: false }
    // const { user, isLoading } = useAuth0();
    // const [state, setState] = useState({
    //     error: null,
    //     loading: true,
    //     roles: null,
    // });

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             if (user === undefined) return;
    //             const url = `https://${process.env.REACT_APP_DOMAIN}:3001/user/roles?user_id=${user.sub}`;
    //             const res = await fetch(url);

    //             setState({
    //                 ...state,
    //                 roles: await res.json(),
    //                 error: null,
    //                 loading: false,
    //             });
    //         } catch (e) {
    //             console.error(e);
    //             setState({
    //                 ...state,
    //                 error: e,
    //                 loading: true,
    //             });
    //         }
    //     })();
    // }, [user]);

    // return({
    //     ...state,
    // });
};