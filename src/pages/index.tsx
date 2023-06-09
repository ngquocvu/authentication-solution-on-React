import { Button, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MessageServices from '../services/MessageServices';
const IndexPage = () => {
  const [message, setMessage] = useState();

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
    </>
  );
};

export default IndexPage;
