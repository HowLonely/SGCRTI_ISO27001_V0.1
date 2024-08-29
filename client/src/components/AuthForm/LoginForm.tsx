import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../reducer/Actions";
import Cookies from "js-cookie";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated);
  const user = useSelector((state) => state.AuthReducer.user);
  const access = useSelector((state) => state.AuthReducer.access);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Correo inválido"),
      password: (val) =>
        val.length <= 7
          ? "La contraseña debe tener como mínimo 8 caracteres"
          : null,
    },
  });

  useEffect(() => {
    console.log("useffect")
    console.log(isAuthenticated)
    console.log(user)
    console.log(access)

    if (isAuthenticated) {
      navigate("/app/"); // Redirige al usuario a una ruta protegida si está autenticado
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await loginAction(values.email, values.password)(dispatch);
      // No hacemos la redirección aquí, ya que el useEffect se encargará de ello
      showNotification({
        title: "Éxito",
        message: "Inicio de sesión exitoso.",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Hubo un problema al iniciar sesión.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={700} pb="lg">
        Iniciar sesión
      </Text>

    {/*<Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="O continue con su correo electrónico" labelPosition="center" my="lg" /> */}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Correo electrónico"
            placeholder="usuario@correo.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email && "Correo inválido"}
            radius="md"
          />

          <PasswordInput
            required
            label="Contraseña"
            placeholder="Tu contraseña"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "La contraseña debe tener como mínimo 8 caracteres"}
            radius="md"
          />
          <Flex justify={"end"}>
            <Anchor href="#" onClick={(event) => event.preventDefault()} fw={500} fz="xs">
              ¿Olvidó su contraseña?
            </Anchor>
          </Flex>
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => navigate("/auth/register")} size="xs">
            ¿No tiene una cuenta? Registrarse
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            INICIAR SESIÓN
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
