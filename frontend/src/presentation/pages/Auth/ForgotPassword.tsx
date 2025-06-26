import { Button, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const onSubmit = () => {
    showNotification({ message: 'Funcionalidade em breve' });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Stack>
        <TextInput
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Button type="submit">Enviar</Button>
        <Link to="/login" className="text-sm text-blue-600">
          Voltar para Login
        </Link>
      </Stack>
    </form>
  );
};

export default ForgotPassword;
