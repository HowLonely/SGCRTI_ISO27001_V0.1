import {
  Button,
  Group,
  Stack,
  Stepper,
  TextInput,
  Textarea,
  Select,
  Tabs,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { IconSubtask } from "@tabler/icons-react";
import { TableAsociation } from "../../Tables/TableAsociation";
import { useModal } from "../ModalContext";

export const ControlForm = ({ initialValues = {}, editMode = false }) => {
  const [active, setActive] = useState(0);
  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  const { handleFormSubmitSuccess } = useModal(); // Extraer el manejador del contexto

  console.log("Controlform: ", initialValues);

  useEffect(() => {
    console.log("initial values risks: " + initialValues.risks)
    if (initialValues.risks) {
      setSelectedRiskIds(initialValues.risks);
    }
  }, [initialValues]);

  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  const form = useForm({
    initialValues: initialValues || {
      name: initialValues.name || "",
      type: initialValues.type || "",
      frequency: initialValues.frequency || "",
      flexibility: initialValues.flexibility || "",
      execution: initialValues.execution || "",
      details: initialValues.details || "",
    },

    validate: (values) => {
      const errors = {};
      if (active === 0) {
        if (!values.name) errors.name = "Ingrese nombre";
        if (!values.type) errors.type = "Ingrese tipo";
        if (!values.frequency) errors.frequency = "Ingrese frecuencia";
        if (!values.flexibility) errors.flexibility = "Ingrese flexibilidad";
        if (!values.execution) errors.execution = "Ingrese ejecución";

        return errors;
      }
    },
  });

  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      risks: selectedRiskIds,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/controls/${
          editMode ? initialValues.id : ""
        }`,
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
        <Stepper.Step
          label="Información general"
          description="Detalles y criterios del control"
        >
          <Stack>
            <TextInput
              required
              radius="md"
              size="md"
              label="Nombre"
              placeholder="Control 1"
              description="Ingrese un nombre para el control"
              inputWrapperOrder={["label", "description", "input", "error"]}
              {...form.getInputProps("name")}
            />
            <Group grow>
              <Select
                required
                radius="md"
                size="md"
                label="Tipo"
                placeholder="Seleccionar"
                description="Clasifique el control si es correctivo, detectivo o preventivo"
                data={[
                  { value: "correctivo", label: "Correctivo" },
                  { value: "detectivo", label: "Detectivo" },
                  { value: "preventivo", label: "Preventivo" },
                ]}
                inputWrapperOrder={["label", "description", "input", "error"]}
                {...form.getInputProps("type")}
              />

              <Select
                required
                radius="md"
                size="md"
                label="Frecuencia de monitoreo del control"
                placeholder="Seleccione una frecuencia de monitoreo"
                description="Frecuencia en la que se le hará revisión al control"
                data={[
                  { value: "anual", label: "Anual" },
                  { value: "mensual", label: "Mensual" },
                  { value: "semanal", label: "Semanal" },
                  { value: "diario", label: "Diario" },
                ]}
                inputWrapperOrder={["label", "description", "input", "error"]}
                {...form.getInputProps("frequency")}
              />
            </Group>

            <Group grow>
              <Select
                required
                radius="md"
                size="md"
                label="Flexibilidad del control"
                placeholder="Seleccione un nivel de flexibilidad"
                description="La facilidad de implementación/adaptación del control"
                data={[
                  { value: "bajo", label: "Bajo: Dificil de aplicar" },
                  { value: "medio", label: "Medio: Aplicable" },
                  { value: "alto", label: "Alto: Fácil de aplicar" },
                ]}
                inputWrapperOrder={["label", "description", "input", "error"]}
                {...form.getInputProps("flexibility")}
              />

              <Select
                required
                radius="md"
                size="md"
                label="Ejecución del control"
                placeholder="Seleccione el tipo de ejecución"
                description="De qué forma se ejecuta el control"
                data={[
                  { value: "manual", label: "Manual" },
                  { value: "combinado", label: "Combinado" },
                  { value: "automatico", label: "Automático" },
                ]}
                inputWrapperOrder={["label", "description", "input", "error"]}
                {...form.getInputProps("execution")}
              />
            </Group>

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
                  </Group>
                  {!fetchRisk.isLoading && (
                    <TableAsociation
                      data={fetchRisk.data}
                      columns={[
                        { key: "name", title: "Nombre" },
                        { key: "probability", title: "Probabilidad" },
                        { key: "impact", title: "Impacto" },
                      ]}
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
          Completo, haga clic en el botón Volver para regresar al paso anterior.
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-around" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Volver
        </Button>
        {active === 2 ? (
          <Button key={"submit"} type="submit">
            {editMode ? "Actualizar" : "Registrar"}
          </Button>
        ) : (
          <Button onClick={nextStep}>Continuar</Button>
        )}
      </Group>
    </form>
  );
};
