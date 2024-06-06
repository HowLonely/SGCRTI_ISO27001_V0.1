import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Stepper,
  TextInput,
  Textarea,
  Tabs,
  Title,
} from "@mantine/core";
import {
  IconAdjustmentsAlt,
  IconCirclePlus,
  IconSubtask,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "@mantine/form";

import { TableCustom } from "../../components/Tables/TableCustom";
import { TableAsociation } from "../../components/Tables/TableAsociation";

export const Procesos = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  // IDS de las asociaciones
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  // Fetchear datos PROBLEMAS AL RENDERIZA
  const fetchProcess = useFetch("http://localhost:8000/api/processes/");
  const fetchEvent = useFetch("http://localhost:8000/api/events/");
  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      events: selectedEventIds,
      risks: selectedRiskIds,
    };
    console.log(requestData);
    try {
      const response = await fetch("http://localhost:8000/api/processes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const resp = await response.json();
      console.log(resp);
    } catch (error) {
      console.error("Error backend:", error);
    }
  };

  // Datos de las tablas
  // Las KEY deben ser los nombres de las columnas de las tablas en el backend (Se podría hacer un mockup)
  const process_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
  ];

  const event_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "state", title: "Estado" },
    { key: "dateTime", title: "Fecha" },
  ];

  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
  ];

  const processes_data = fetchProcess.data;
  const events_data = fetchEvent.data;
  const risks_data = fetchRisk.data;

  const form = useForm({
    initialValues: {
      name: "",
      details: "",
    },

    validate: (values) => {
      // Validaciones de cada step
      if (active === 0) {
        return {
          name: values.name ? null : "Ingrese un nombre del proceso",
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
      return current < 2 /* ULTIMO VALOR DEL STEPPER */ ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stack>
      <Group justify={"flex-start"}>
        {/* BODY */}
        <Modal
          h={300}
          opened={opened}
          onClose={close}
          title="Crear proceso"
          size={"xl"}
          centered
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {/* Modal content */}
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
            >
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
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("name")}
                  />
                  <Textarea
                    radius="md"
                    size="md"
                    label="Descripción"
                    placeholder="Breve descripción"
                    description="Ingrese una breve descripción del proceso"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("details")}
                  />
                </Stack>
              </Stepper.Step>

              <Stepper.Step
                label="Realice asociaciones"
                description="Asociar riesgos, responsables, etc"
              >
                <Group grow>
                  <Tabs
                    variant="outline"
                    orientation="horizontal"
                    defaultValue="eventos"
                    radius={"lg"}
                  >
                    <Tabs.List>
                      <Tabs.Tab value="eventos" leftSection={<IconSubtask />}>
                        Eventos
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="riesgos"
                        leftSection={<IconAdjustmentsAlt />}
                      >
                        Riesgos
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="eventos" p={"sm"}>
                      <Stack>
                        <Group justify="space-between">
                          <Title order={5}>Eventos asociados</Title>
                          <Button
                            variant="outline"
                            leftSection={<IconCirclePlus size={22} />}
                            size="sm"
                          >
                            Nuevo evento
                          </Button>
                        </Group>
                        {!fetchEvent.isLoading && (
                          <TableAsociation
                            data={events_data}
                            columns={event_columns}
                            selectedIds={selectedEventIds}
                            setSelectedIds={setSelectedEventIds}
                          />
                        )}
                      </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="riesgos" p={"sm"}>
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
                            data={risks_data}
                            columns={risk_columns}
                            selectedIds={selectedRiskIds}
                            setSelectedIds={setSelectedRiskIds}
                          />
                        )}
                      </Stack>
                    </Tabs.Panel>
                  </Tabs>
                </Group>
              </Stepper.Step>

              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Volver
              </Button>
              {active === 2 ? (
                <Button key={"submit"} type="submit">
                  Registrar
                </Button>
              ) : (
                <Button onClick={nextStep}>Continuar</Button>
              )}
            </Group>
          </form>
        </Modal>

        <Button onClick={open} variant="outline" size="md" radius={"md"}>
          Agregar proceso
        </Button>
      </Group>

      {!fetchProcess.isLoading && (
        <TableCustom data={processes_data} columns={process_columns} />
      )}
    </Stack>
  );
};
