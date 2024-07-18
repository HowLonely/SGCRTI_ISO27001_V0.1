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
import { useFetch } from "../../hooks/useFetch";
import { IconSubtask } from "@tabler/icons-react";
import { TableAsociation } from "../../components/Tables/TableAsociation";

export const ControlForm = ({ initialValues, editMode }) => {
  const [active, setActive] = useState(0);

  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  console.log("Controlform: ", initialValues);

  useEffect(() => {
    // Selecciona automáticamente los procesos y controles del riesgo inicial
    if (initialValues && initialValues.risks) {
      setSelectedRiskIds(initialValues.risks);
    }
  }, [initialValues]);

  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
  ];

  const risk_data = fetchRisk.data;

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      risks: selectedRiskIds,
    };

    if (editMode) {
      // Lógica para actualizar un control existente (PUT)
      console.log("Actualizar control:", requestData);
      try {
        const response = await fetch(
          `http://localhost:8000/api/controls/${initialValues.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
        const resp = await response.json();
        console.log(resp);
      } catch (error) {
        console.error("Error al actualizar el control:", error);
      }
    } else {
      // Lógica para crear un nuevo control (POST)
      console.log("Crear nuevo control:", requestData);
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
        console.error("Error al crear el nuevo control:", error);
      }
    }

    close()
    console.log("close")
  };

  const form = useForm({
    initialValues: initialValues || {
      name: "",
      type: "",
      frequency: "",
      flexibility: "",
      execution: "",
      details: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name: values.name ? null : "Ingrese un nombre del control",
          type: values.type ? null : "Ingrese un tipo al control",
          frequency: values.frequency
            ? null
            : "Ingrese la frecuencia del control",
          flexibility: values.flexibility
            ? null
            : "Ingrese la flexibilidad del control",
          execution: values.execution
            ? null
            : "Ingrese la ejecución del control",
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
              label="Nombre del Control"
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
                label="Tipo de Control"
                placeholder="Seleccione el tipo de control"
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
