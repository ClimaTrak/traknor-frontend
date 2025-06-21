import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../application/stores/authStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login('dummy');
    navigate('/app/overview', { replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl">Login</h1>
      <Button onClick={handleLogin}>Entrar</Button>
    </div>
  );
};

export default Login;
