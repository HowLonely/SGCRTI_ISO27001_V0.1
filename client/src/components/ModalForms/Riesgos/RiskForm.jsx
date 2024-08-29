import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Select,
  Stack,
  Stepper,
  Switch,
  Tabs,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAdjustmentsAlt, IconSubtask } from "@tabler/icons-react";
import { TableAsociation } from "../../Tables/TableAsociation";
import { useFetch } from "../../../hooks/useFetch";
import { useModal } from "../ModalContext"; // Importar el contexto

export const RiskForm = ({ initialValues = {}, editMode = false }) => {
  const [active, setActive] = useState(0);
  const [selectedControlIds, setSelectedControlIds] = useState([]);
  const [selectedProcessIds, setSelectedProcessIds] = useState([]);
  const [checked, setChecked] = useState(false);

  const { handleFormSubmitSuccess } = useModal(); // Extraer el manejador del contexto

  useEffect(() => {
    if (initialValues.processes) {
      setSelectedProcessIds(initialValues.processes);
    }
    if (initialValues.controls) {
      setSelectedControlIds(initialValues.controls);
    }
  }, [initialValues]);

  const fetchProcess = useFetch("http://localhost:8000/api/processes/");
  const fetchControl = useFetch("http://localhost:8000/api/controls/");

  const form = useForm({
    initialValues: {
      name: initialValues.name || "",
      impact: initialValues.impact || "",
      probability: initialValues.probability || "",
      details: initialValues.details || "",
    },
    validate: (values) => {
      const errors = {};
      if (active === 0) {
        if (!values.name) errors.name = "Ingrese un nombre del riesgo";
        if (!values.probability)
          errors.probability = "Ingrese una probabilidad";
        if (!values.impact) errors.impact = "Ingrese el impacto";
      }
      return errors;
    },
  });

  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      controls: selectedControlIds,
      processes: selectedProcessIds,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/risks/${editMode ? initialValues.id : ""}`,
        {
          method: editMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Error en la solicitud");

      // Si el registro o edición fue exitoso
      handleFormSubmitSuccess(); // <-- Llamada para cerrar el modal
    } catch (error) {
      console.error("Error al procesar:", error);
    }
  };

  const nextStep = () =>
    setActive((current) => (form.validate().hasErrors ? current : current + 1));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Información general" description="Detalles del riesgo">
          <Stack>
            <TextInput
              required
              radius="md"
              size="md"
              label="Nombre"
              placeholder="Riesgo 1"
              description="Ingrese un nombre para el riesgo"
              {...form.getInputProps("name")}
            />
            <Group grow>
              <Select
                required
                size="md"
                radius="md"
                label="Probabilidad"
                description="Probalidad que ocurra el riesgo"
                placeholder="Seleccionar"
                data={[
                  { value: "0.15", label: "Improbable 15%" },
                  { value: "0.30", label: "Poco probable 30%" },
                  { value: "0.45", label: "Probable 45%" },
                  { value: "0.60", label: "Muy probable 60%" },
                  { value: "0.75", label: "Frecuente 75%" },
                ]}
                {...form.getInputProps("probability")}
              />
              <Select
                required
                size="md"
                radius="md"
                label="Impacto"
                description="Evalue el impacto que tendrá el riesgo"
                placeholder="% Impacto total (Promedio)"
                data={[
                  { value: "0.15", label: "Insignificante 15%" },
                  { value: "0.30", label: "Menor 30%" },
                  { value: "0.45", label: "Moderado 45%" },
                  { value: "0.60", label: "Mayor 60%" },
                  { value: "0.75", label: "Catastrófico 75%" },
                ]}
                {...form.getInputProps("impact")}
              />
            </Group>
            <Textarea
              radius="md"
              size="md"
              label="Descripción"
              placeholder="Breve descripción"
              description="Ingrese una breve descripción del riesgo"
              {...form.getInputProps("details")}
            />
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              color="teal"
              size="md"
              label="¿Afecta el funcionamiento de la organización?"
            />
          </Stack>
        </Stepper.Step>

        <Stepper.Step
          label="Asociaciones"
          description="Asociar controles, procesos, etc"
        >
          <Group grow>
            <Tabs
              variant="outline"
              orientation="horizontal"
              defaultValue="procesos"
              radius={"lg"}
            >
              <Tabs.List>
                <Tabs.Tab value="procesos" leftSection={<IconSubtask />}>
                  Procesos
                </Tabs.Tab>
                <Tabs.Tab
                  value="controles"
                  leftSection={<IconAdjustmentsAlt />}
                >
                  Controles
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="procesos" p={"sm"}>
                <Stack>
                  <Group justify="space-between">
                    <Title order={5}>Procesos asociados</Title>
                  </Group>
                  {!fetchProcess.isLoading && (
                    <TableAsociation
                      data={fetchProcess.data}
                      columns={[
                        { key: "id", title: "Código" },
                        { key: "name", title: "Nombre" },
                      ]}
                      selectedIds={selectedProcessIds}
                      setSelectedIds={setSelectedProcessIds}
                    />
                  )}
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="controles" p={"sm"}>
                <Stack>
                  <Group justify="space-between">
                    <Title order={5}>Controles asociados</Title>
                  </Group>
                  {!fetchControl.isLoading && (
                    <TableAsociation
                      data={fetchControl.data}
                      columns={[
                        { key: "id", title: "Código" },
                        { key: "name", title: "Nombre" },
                        { key: "type", title: "Tipo" },
                        { key: "efficacy", title: "Eficacia" },
                      ]}
                      selectedIds={selectedControlIds}
                      setSelectedIds={setSelectedControlIds}
                    />
                  )}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Group>
        </Stepper.Step>

        <Stepper.Completed>
          Completado, por favor haga clic en registrar para crear el riesgo.
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Atrás
          </Button>
        )}
        {active < 2 && <Button onClick={nextStep}>Siguiente</Button>}
        {active === 2 && <Button type="submit">Registrar</Button>}
      </Group>
    </form>
  );
};
