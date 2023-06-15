import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { LoginPayload } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { login } from '../../redux/slices/AuthSlice';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email format',
    },
  });

  const onFormSubmit = ({ email, password }: LoginPayload) => {
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email & password to login
      </Text>
      <Paper radius="md" p="xl" withBorder mt="xl">
        <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
          <Stack>
            <TextInput
              placeholder=""
              label="Email"
              w="100%"
              radius="lg"
              withAsterisk
              error={form.errors.email}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="Password"
              w="100%"
              label="Password"
              description="Password must include at least one letter, number and special character"
              radius="lg"
              withAsterisk
              {...form.getInputProps('password')}
            />
            <Text color="red" size="xs">
              {auth.error}
            </Text>
            <Button color="red" fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default AuthForm;
