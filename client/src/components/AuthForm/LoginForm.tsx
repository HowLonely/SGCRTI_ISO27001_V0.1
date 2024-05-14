import { useToggle, upperFirst } from "@mantine/hooks";
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

import { notifications, showNotification } from "@mantine/notifications";

import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../../reducer/Actions";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticatedSelector = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

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

  if (isAuthenticatedSelector) {
    return navigate("/app/");
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Welcome to (App), Iniciar sesión con
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider
        label="O continue con su correo electrónico"
        labelPosition="center"
        my="lg"
      />

      <form
        onSubmit={form.onSubmit((val, e) => {
          loginAction(val.email, val.password)(dispatch);
        })}
      >
        <Stack>
          <TextInput
            required
            label="Correo electrónico"
            placeholder="usuario@correo.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Correo inválido"}
            radius="md"
          />

          <PasswordInput
            required
            label="Contraseña"
            placeholder="Tu constraseña"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "La contraseña debe tener como mínimo 8 caracteres"
            }
            radius="md"
          />
          <Flex justify={"end"}>
            <Anchor
              href="#"
              onClick={(event) => event.preventDefault()}
              fw={500}
              fz="xs"
            >
              ¿Olvidó su contraseña?
            </Anchor>
          </Flex>
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => navigate("/auth/register")}
            size="xs"
          >
            ¿No tiene una cuenta? Registrarse
          </Anchor>
          <Button type="submit" radius="xl">
            INICIAR SESIÓN
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
