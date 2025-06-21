import { useAuthStore } from '../stores/authStore';

const useIsAuthenticated = () => !!useAuthStore((state) => state.token);

export default useIsAuthenticated;
