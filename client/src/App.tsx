/* eslint-disable react-refresh/only-export-components */
import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import { IUser } from '../models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1>
      <h1>
        {store.user.isActivated ? `Почта подтверждена ${store.user.email}` : 'Подтвердите аккаунт!'}{' '}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
