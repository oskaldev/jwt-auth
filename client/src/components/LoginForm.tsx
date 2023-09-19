import React, { FC, useState } from 'react';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <div>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text'
        placeholder='Email'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='text'
        placeholder='Password'
      />
      <button>Логин</button>
      <button>Регистрация</button>
    </div>
  );
};

export default LoginForm;
