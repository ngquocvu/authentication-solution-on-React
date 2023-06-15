import { Button, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MessageServices from '../services/MessageServices';
import { useAppDispatch } from '../hooks/useRedux';
import { login, logout } from '../redux/slices/AuthSlice';
const IndexPage = () => {
  const [message, setMessage] = useState();
  const dispatch = useAppDispatch();

  const fetchMessage = async () => {
    const data = await MessageServices.getAllMessage();
    console.log(message);
  };

  return (
    <>
      <Link to="/login">
        <Text size={'xl'}>Login</Text>
      </Link>
      <Button onClick={() => fetchMessage()}>Message</Button>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </>
  );
};

export default IndexPage;
