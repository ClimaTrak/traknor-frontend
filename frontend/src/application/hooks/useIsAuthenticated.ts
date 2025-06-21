import { useAuthStore } from '../stores/useAuthStore';

const useIsAuthenticated = () => !!useAuthStore((state) => state.token);

export default useIsAuthenticated;
