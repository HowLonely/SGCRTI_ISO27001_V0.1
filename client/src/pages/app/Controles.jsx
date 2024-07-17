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

  // IDS de las asociaciones
  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  const fetchControl = useFetch("http://localhost:8000/api/controls/");
  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

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

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      risks: selectedRiskIds,
    };
    console.log(requestData);
    try {
      const response = await fetch("http://localhost:8000/api/controls/", {
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

  const form = useForm({
    initialValues: {
      name: "",
      efficiency: "",
      details: "",
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
      return current < 2 ? current + 1 : current;
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
          title="Crear Controles"
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
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
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
                      { value: "0.2", label: "Mediocre" },
                      { value: "0.4", label: "Adecuado" },
                      { value: "0.6", label: "Bueno" },
                      { value: "0.8", label: "Excelente" },
                    ]}
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("efficiency")}
                  />

                  <Textarea
                    radius="md"
                    size="md"
                    label="Descripción del Control"
                    placeholder="Breve descripción"
                    description="Ingrese una breve descripción del control"
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
                Completo, haga clic en el botón Volver para regresar al paso
                anterior.
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
          Agregar Control
        </Button>
      </Group>

      {!fetchControl.isLoading && (
        <TableCustom data={control_data} columns={control_columns} />
      )}
    </Stack>
  );
};
