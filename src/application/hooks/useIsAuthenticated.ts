import { useAuthStore } from '@/application/stores/useAuthStore';

const useIsAuthenticated = () => !!useAuthStore((state) => state.token);

export default useIsAuthenticated;
