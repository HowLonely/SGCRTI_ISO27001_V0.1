import { Box, Center } from "@mantine/core";
import { RegisterForm } from "../../components/AuthForm/RegisterForm";


export const Register = () => {
  return (
    <Center mih={650}>
      <Box w={600}>
        <RegisterForm />
      </Box>
    </Center>
  );
};


