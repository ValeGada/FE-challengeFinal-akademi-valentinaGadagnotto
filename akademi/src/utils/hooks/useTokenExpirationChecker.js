import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/actions/authActions';

const useTokenExpirationChecker = () => {
    const dispatch = useDispatch();
    const expiration = useSelector(state => state.auth.expiration)

    useEffect(() => {
        if (!expiration) return;

        const now = Date.now();
        const expiresIn = new Date(expiration).getTime() - now;

        if (expiresIn <= 0 || expiration === undefined) {
            dispatch(logout("Tu sesión expiró. Por favor, inicia sesión nuevamente."));
        } else {
            const timeoutId = setTimeout(() => {
                dispatch(logout("Tu sesión expiró. Por favor, inicia sesión nuevamente."));
            }, expiresIn);

            // Clean up del useEffect()
            return () => clearTimeout(timeoutId); // Para que no se vuelva a ejecutar al desmontar o volver a montar
        }
    }, [dispatch, expiration]);
};

export default useTokenExpirationChecker;