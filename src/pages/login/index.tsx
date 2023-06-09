import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  createStyles,
  Container,
  Title,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.blue[6],
  },
}));

const initialValues = {
  email: '',
  name: '',
  password: '',
  terms: true,
};

type InitialValuesTypes = typeof initialValues;

export default function LoginPage(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const { classes } = useStyles();
  const form = useForm({
    initialValues: initialValues,
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const formSubmitHandle = (values: InitialValuesTypes) => {
    console.log(values);
  };

  return (
    <div className={classes.root}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Title order={3} weight={500} align={'center'}>
          {type.toLocaleUpperCase()}
        </Title>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit((value) => formSubmitHandle(value))}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event: any) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event: any) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event: any) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event: any) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
