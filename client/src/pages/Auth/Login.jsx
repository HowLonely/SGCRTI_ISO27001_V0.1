import { Box, Center } from "@mantine/core";
import { LoginForm } from "../../components/AuthForm/LoginForm";


export const Login = () => {
  return (
    <Center mih={650}>
      <Box w={600}>
        <LoginForm />
      </Box>
    </Center>
  );
};


