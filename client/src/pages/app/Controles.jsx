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
import { useFetch } from "../../hooks/useFetch";

import { TableCustom } from "../../components/Tables/TableCustom";

export const Controles = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const fetchControl = useFetch("http://localhost:8000/api/controls/")

  // Columnas de las tablas
  //MAIN
  const controls_columns = [
    { key: 'id', title: 'Código' },
    { key: 'name', title: 'Nombre' },
    { key: 'efficiency', title: 'Eficacia' },
  ];

  const control_data = fetchControl.data;

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stack>
      <Group justify={"flex-start"}>
        {/* BODY */}
        <Modal
          opened={opened}
          onClose={close}
          title="Crear Controles"
          size={"xl"}
          centered
        >
          {/* Modal content */}
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step
              label="Crear Control"
              description="Información general"
            >
              <Stack>
                <TextInput
                  required
                  radius="md"
                  size="md"
                  label="Nombre del Control"
                  placeholder="Control 1"
                  description="Ingrese un nombre para el control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Textarea
                  required
                  radius="md"
                  size="md"
                  label="Descripción del Control"
                  placeholder="Breve descripción"
                  description="Ingrese una breve descripción del control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Select
                  required
                  radius="md"
                  size="md"
                  label="Calificación del Control"
                  placeholder="Seleccione una calificación"
                  description="Califique la efectividad del control"
                  data={[
                    { value: '1', label: 'Deficiente' },
                    { value: '2', label: 'Mediocre' },
                    { value: '3', label: 'Adecuado' },
                    { value: '4', label: 'Bueno' },
                    { value: '5', label: 'Excelente' },
                  ]}
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Realizar asociaciones"
              description="Asociar riesgos, activos, procesos, etc."
            >
              <Stack>
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Riesgos"
                  placeholder="Nombre del Riesgo"
                  description="Ingrese el nombre del riesgo al que está asociado el control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Activos"
                  placeholder="Nombre del Activo"
                  description="Ingrese el nombre del activo al que está asociado el control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Procesos"
                  placeholder="Nombre del Proceso"
                  description="Ingrese el nombre del proceso al que está asociado el control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <TextInput
                  radius="md"
                  size="md"
                  label="Asociación a Eventos/Incidentes"
                  placeholder="Nombre del Evento/Incidente"
                  description="Ingrese el nombre del evento/incidente al que está asociado el control"
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
                  description="Ingrese cómo se evaluará la efectividad del control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                />
                <Select
                  required
                  radius="md"
                  size="md"
                  label="Frecuencia de Revisión"
                  placeholder="Seleccione la frecuencia"
                  description="Seleccione la frecuencia con la que se revisará el control"
                  data={[
                    { value: 'monthly', label: 'Mensual' },
                    { value: 'quarterly', label: 'Trimestral' },
                    { value: 'semiannually', label: 'Semestral' },
                    { value: 'annually', label: 'Anual' },
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
              Completo, haga clic en el botón Volver para regresar al paso anterior.
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
          Agregar Control
        </Button>
      </Group>

      {!fetchControl.isLoading && <TableCustom data={control_data} columns={controls_columns}/>}

    </Stack>
  );
};
