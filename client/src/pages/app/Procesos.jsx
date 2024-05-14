import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const Procesos = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stack>
      <Flex justify={"flex-start"}>
        {/* BODY */}
        <Modal
          opened={opened}
          onClose={close}
          title="Crear proceso"
          size={"xl"}
          centered
        >
          {/* Modal content */}
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step
              label="Cree un proceso"
              description="Información general"
            >
              <Stack>
                <TextInput
                  required
                  radius="md"
                  size="md"
                  label="Nombre"
                  placeholder="Proceso 1"
                  description="Ingrese un nombre para el proceso"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Group grow>
                  <TextInput
                    size="md"
                    radius="md"
                    label="Categoría"
                    placeholder="Proceso 1"
                    description="Ingrese un nombre para el proceso"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                  />
                  <TextInput
                    size="md"
                    radius="md"
                    label="Nombre"
                    placeholder="Proceso 1"
                    description="Ingrese un nombre para el proceso"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                  />
                </Group>
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Realice asociaciones"
              description="Asociar riesgos, responsables, etc"
            >
              Step 2 content: Verify email
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Get full access">
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Volver
            </Button>
            <Button onClick={nextStep}>Continuar</Button>
          </Group>
        </Modal>

        <Button onClick={open} variant="outline" size="md" radius={"md"}>
          Agregar proceso
        </Button>
      </Flex>
    </Stack>
  );
};
