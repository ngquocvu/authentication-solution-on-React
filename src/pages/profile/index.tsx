import { Text, Title } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useEffect } from 'react';
import { getCurrentProfile } from '../../redux/slices/ProfileSlice';

const ProfilePage = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <div>
      <Title order={1}>Profile</Title>
      <Text>{profile.current.name}</Text>
      <Text>{profile.current.email}</Text>
      <Text>{profile.status}</Text>
      <Text>{profile.error}</Text>
    </div>
  );
};

export default ProfilePage;
