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
  Tabs,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import { TableCustom } from "../../components/Tables/TableCustom";
import {
  IconAdjustmentsAlt,
  IconCirclePlus,
  IconSubtask,
} from "@tabler/icons-react";
import { TableAsociation } from "../../components/Tables/TableAsociation";

export const Controles = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const fetchControl = useFetch("http://localhost:8000/api/controls/");
  const fetchRisk = useFetch("http://localhost:8000/api/risks/")

  // Columnas de las tablas
  //MAIN
  const control_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "efficiency", title: "Eficacia" },
  ];

  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
  ];

  const control_data = fetchControl.data;
  const risk_data = fetchRisk.data;

  const form = useForm({
    initialValues: {
      name: "",
      efficiency: "",
      details: "",
      risk: "", // id del riesgo asociado
      //Falta afecta funcionamiento (en backend y front)
    },

    validate: (values) => {
      // Validaciones de cada step
      if (active === 0) {
        return {
          name: values.name ? null : "Ingrese un nombre del control",
          efficiency: values.efficiency
            ? null
            : "Ingrese una calificación al control",
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

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
          <Stepper
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
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
                  {...form.getInputProps("name")}
                />

                <Select
                  required
                  radius="md"
                  size="md"
                  label="Calificación del Control"
                  placeholder="Seleccione una calificación"
                  description="Califique la efectividad del control"
                  data={[
                    { value: "1", label: "Deficiente" },
                    { value: "2", label: "Mediocre" },
                    { value: "3", label: "Adecuado" },
                    { value: "4", label: "Bueno" },
                    { value: "5", label: "Excelente" },
                  ]}
                  inputWrapperOrder={["label", "description", "input", "error"]}
                  {...form.getInputProps("efficiency")}
                />

                <Textarea
                  radius="md"
                  size="md"
                  label="Descripción del Control"
                  placeholder="Breve descripción"
                  description="Ingrese una breve descripción del control"
                  inputWrapperOrder={["label", "description", "input", "error"]}
                  {...form.getInputProps("details")}
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Realizar asociaciones"
              description="Asociar riesgos, activos, procesos, etc."
            >
              <Group grow>
                <Tabs
                  variant="outline"
                  orientation="horizontal"
                  defaultValue="risks"
                  radius={"lg"}
                >
                  <Tabs.List>
                    <Tabs.Tab value="risks" leftSection={<IconSubtask />}>
                      Riesgos
                    </Tabs.Tab>
                    
                  </Tabs.List>

                  <Tabs.Panel value="risks" p={"sm"}>
                    <Stack>
                      <Group justify="space-between">
                        <Title order={5}>Riesgos asociados</Title>
                        <Button
                          variant="outline"
                          leftSection={<IconCirclePlus size={22} />}
                          size="sm"
                        >
                          Nuevo riesgo
                        </Button>
                      </Group>
                      {!fetchRisk.isLoading && (
                        <TableAsociation
                          data={risk_data}
                          columns={risk_columns}
                        />
                      )}
                    </Stack>
                  </Tabs.Panel>
                </Tabs>
              </Group>
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
          Agregar Control
        </Button>
      </Group>

      {!fetchControl.isLoading && (
        <TableCustom data={control_data} columns={control_columns} />
      )}
    </Stack>
  );
};
