import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import classes from "./UserButton.module.css";

import PropTypes from "prop-types"; // Importa PropTypes

export function UserButton({ user }) {
  if (!user) return
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.first_name} {user.last_name}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}

UserButton.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // Agrega aquí otras propiedades de usuario que esperas recibir
  }).isRequired,
};
