import { useForm } from "@mantine/form";

import React, { useState } from "react";

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
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";

import { useNavigate } from "react-router-dom";

import { Loader } from '@mantine/core';

import { signup } from "../../reducer/Actions";
import { useDispatch, useSelector } from "react-redux";

export function RegisterForm(props: PaperProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const messageSelector = useSelector((state) => state.AuthReducer.message);

  const [isSendingNotification, setIsSendingNotification] = useState(false); // Estado para controlar el envío de la notificación

  const form = useForm({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password1: "",
      password2: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Correo inválido"),
      password1: (val) =>
        val.length <= 8
          ? "La contraseña debe tener como mínimo 8 caracteres"
          : null,
      terms: (val) => (!val ? "Debe aceptar los términos y condiciones" : null),
      password2: (val, values) =>
        val != values.password1 ? "Las contraseñas no coinciden" : null,
    },
  });

  const handleSubmit = async (val) => {
    try {
      // Establecer el estado en true al inicio de la solicitud
      setIsSendingNotification(true);
      // Realizar la solicitud de registro
      await signup(
        val.email,
        val.first_name,
        val.last_name,
        val.password1,
        val.password2,
        val.terms
      )(dispatch);
      // Establecer el estado en false después de la solicitud, si es exitosa
      setIsSendingNotification(false);
    } catch (error) {
      // Establecer el estado en false si hay un error en la solicitud
      setIsSendingNotification(false);
      // Manejar el error aquí, si es necesario
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      
      {isSendingNotification && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscurecido
            zIndex: 9999, // Coloca el loader encima de otros elementos
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="blue" size="xl" />
        </div>
      )}

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
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack>
          <Group justify="space-between" grow>
            <TextInput
              required
              label="Nombres"
              placeholder="Uno o más nombres"
              value={form.values.first_name}
              onChange={(event) =>
                form.setFieldValue("first_name", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Apellidos"
              placeholder="Uno o más apellidos"
              value={form.values.last_name}
              onChange={(event) =>
                form.setFieldValue("last_name", event.currentTarget.value)
              }
              radius="md"
            />
          </Group>
          <TextInput
            required
            label="Correo electrónico"
            placeholder="usuario@gmail.com"
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
            placeholder="Tu contraseña"
            value={form.values.password1}
            onChange={(event) =>
              form.setFieldValue("password1", event.currentTarget.value)
            }
            error={
              form.errors.password1 &&
              "La contraseña debe tener como mínimo 8 caracteres"
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Confirmar contraseña"
            placeholder="Confirmar tu contraseña"
            value={form.values.password2}
            onChange={(event) =>
              form.setFieldValue("password2", event.currentTarget.value)
            }
            error={form.errors.password2 && "Las contraseñas no coinciden"}
            radius="md"
          />

          <Checkbox
            label="Acepto los términos y condiciones"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
            error={
              form.errors.terms && "Debe aceptar los términos y condiciones"
            }
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => navigate("/auth/login")}
            size="xs"
          >
            ¿Ya tiene una cuenta? Iniciar sesión
          </Anchor>
          <Button type="submit" radius="xl">
            REGISTRARSE
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
