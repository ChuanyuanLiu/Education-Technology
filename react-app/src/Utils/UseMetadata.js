import {useEffect, useState} from "react";
import {useAuth0} from "Utils/UseAuth";

export const useMetadata = () => {
    return {
        error: null,
        metadata: {
            active: true,
        },
        loading: false,
    };
};
