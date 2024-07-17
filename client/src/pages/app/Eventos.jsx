import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Stepper,
  TextInput,
  Textarea,
  Select,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const Eventos = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stack>
      <Flex justify={"flex-start"}>
        <Modal
          h={300}
          opened={opened}
          onClose={close}
          title="Registrar Evento/Incidente"
          size={"xl"}
          centered
        >
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step
              label="Registrar Evento/Incidente"
              description="Detalles del evento/incidente"
            >
              <Stack>
                <TextInput
                  required
                  radius="md"
                  size="md"
                  label="Nombre del Evento/Incidente"
                  placeholder="Incidente 1"
                  description="Ingrese un nombre para el evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Textarea
                  required
                  radius="md"
                  size="md"
                  label="Descripción del Evento/Incidente"
                  placeholder="Breve descripción"
                  description="Ingrese una breve descripción del evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Select
                  required
                  radius="md"
                  size="md"
                  label="Tipo de Evento/Incidente"
                  placeholder="Seleccione el tipo de evento/incidente"
                  description="Seleccione el tipo de evento/incidente"
                  data={[
                    { value: "security-breach", label: "Brecha de seguridad" },
                    { value: "data-leak", label: "Fuga de datos" },
                    { value: "hardware-failure", label: "Falla de hardware" },
                    { value: "software-bug", label: "Error de software" },
                    { value: "human-error", label: "Error humano" },
                  ]}
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <TextInput
                  required
                  radius="md"
                  size="md"
                  label="Fecha del Evento/Incidente"
                  placeholder="YYYY-MM-DD"
                  description="Ingrese la fecha del evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Asociar Evento/Incidente"
              description="Asociar a riesgos, activos, etc."
            >
              <Stack>
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Riesgos"
                  placeholder="Nombre del Riesgo"
                  description="Ingrese el nombre del riesgo al que está asociado el evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Activos"
                  placeholder="Nombre del Activo"
                  description="Ingrese el nombre del activo al que está asociado el evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Evaluación y Monitoreo"
              description="Programar revisiones y evaluar efectividad"
            >
              <Stack>
                <Textarea
                  required
                  radius="md"
                  size="md"
                  label="Método de Evaluación"
                  placeholder="Describa el método de evaluación"
                  description="Ingrese cómo se evaluará la efectividad del evento/incidente"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Select
                  required
                  radius="md"
                  size="md"
                  label="Frecuencia de Revisión"
                  placeholder="Seleccione la frecuencia"
                  description="Seleccione la frecuencia con la que se revisará"
                  data={[
                    { value: "monthly", label: "Mensual" },
                    { value: "quarterly", label: "Trimestral" },
                    { value: "semiannually", label: "Semestral" },
                    { value: "annually", label: "Anual" },
                  ]}
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Checkbox
                  radius="md"
                  size="md"
                  label="Notificaciones de Revisión"
                  description="Marque para recibir notificaciones de revisión"
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Completed>
              Completo, haga clic en el botón Volver para regresar al paso
              anterior.
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
          Registrar Evento
        </Button>
      </Flex>
    </Stack>
  );
};
