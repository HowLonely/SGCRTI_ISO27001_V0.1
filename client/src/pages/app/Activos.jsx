import {
  Button,
  Collapse,
  Fieldset,
  Group,
  Modal,
  Select,
  Stack,
  Stepper,
  Switch,
  Tabs,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustmentsAlt,
  IconCirclePlus,
  IconSubtask,
} from "@tabler/icons-react";
import { useState } from "react";
import { TableCustom } from "../../components/Tables/TableCustom";
import { TableAsociation } from "../../components/Tables/TableAsociation";

import { useForm } from "@mantine/form";
import { useFetch } from "../../hooks/useFetch";

export const Activos = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  // IDS de las asociaciones
  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  // Fetchear datos PROBLEMAS AL RENDERIZA
  const fetchAsset = useFetch("http://localhost:8000/api/assets/");
  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      risk: selectedRiskIds,
    };
    console.log("POST DATA: ", requestData);
    try {
      const response = await fetch("http://localhost:8000/api/assets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const resp = await response.json();
    } catch (error) {
      console.error("Error backend:", error);
    }
  };

  // Datos de las tablas
  // Las KEY deben ser los nombres de las columnas de las tablas en el backend (Se podría hacer un mockup)
  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
  ];

  const asset_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "criticality", title: "Criticidad" },
  ];

  const risks_data = fetchRisk.data;
  const assets_data = fetchAsset.data;

  const form = useForm({
    initialValues: {
      name: "",
      criticality: "",
      details: "",
    },

    validate: (values) => {
      // Validaciones de cada step
      if (active === 0) {
        return {
          name: values.name ? null : "Ingrese un nombre del Activo",
          criticality: values.criticality
            ? null
            : "Ingrese la criticidad del Activo",
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
        <Modal
          h={300}
          opened={opened}
          onClose={close}
          title="Crear Activo de Información"
          size={"xl"}
          centered
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
            >
              <Stepper.Step
                label="Crear Activo de Información"
                description="Información general"
              >
                <Stack>
                  <TextInput
                    required
                    radius="md"
                    size="md"
                    label="Nombre del Activo"
                    placeholder="Activo 1"
                    description="Ingrese un nombre para el activo"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("name")}
                  />
                  <Textarea
                    required
                    radius="md"
                    size="md"
                    label="Descripción del Activo"
                    placeholder="Breve descripción"
                    description="Ingrese una breve descripción del activo"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("details")}
                  />
                  <Select
                    required
                    radius="md"
                    size="md"
                    label="Criticidad"
                    placeholder="Seleccione el Porcentaje de criticidad"
                    description="Seleccione el porcentaje de criticidad para la organización"
                    data={[
                      { value: "0.2", label: "Baja" },
                      { value: "0.4", label: "Media" },
                      { value: "0.6", label: "Alta" },
                    ]}
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("criticality")}
                  />
                  <Select
                    required
                    radius="md"
                    size="md"
                    label="Tipo de Activo"
                    placeholder="Seleccione el tipo de activo"
                    description="Seleccione el tipo de activo de información"
                    data={[
                      { value: "hardware", label: "Hardware" },
                      { value: "software", label: "Software" },
                      { value: "data", label: "Datos" },
                      { value: "people", label: "Personas" },
                      { value: "facilities", label: "Instalaciones" },
                    ]}
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                  />
                  {/* FALTA EL TIPO DE ACTIVO */}
                </Stack>
              </Stepper.Step>

              <Stepper.Step
                label="Asociar Activo"
                description="Asociar a riesgos, procesos, etc."
              >
                <Group grow>
                  <Tabs
                    variant="outline"
                    orientation="horizontal"
                    defaultValue="riesgos"
                    radius={"lg"}
                  >
                    <Tabs.List>
                      <Tabs.Tab value="riesgos" leftSection={<IconSubtask />}>
                        Riesgos
                      </Tabs.Tab>
                    </Tabs.List>

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

                    {/* Agregar mas panel */}
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
          Agregar Activo
        </Button>
      </Group>

      {!fetchAsset.isLoading && (
        <TableCustom data={assets_data} columns={asset_columns} />
      )}
    </Stack>
  );
};
