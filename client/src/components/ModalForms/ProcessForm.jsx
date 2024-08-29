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
import {
  IconAdjustmentsAlt,
  IconCirclePlus,
  IconSubtask,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { TableAsociation } from "../Tables/TableAsociation";
import { useFetch } from "../../hooks/useFetch";

export const ProcessForm = ({ initialValues, editMode }) => {
  const [active, setActive] = useState(0);

  // IDS de las asociaciones seleccionadas
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [selectedRisksIds, setSelectedRisksIds] = useState([]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Selecciona automáticamente los procesos y controles del riesgo inicial
    if (initialValues && initialValues.risks) {
      setSelectedRisksIds(initialValues.risks);
    }
    if (initialValues && initialValues.events) {
      setSelectedEventIds(initialValues.events);
    }
  }, [initialValues]);

  // Fetchear datos
  const fetchEvents = useFetch("http://localhost:8000/api/events/");
  const fetchRisks = useFetch("http://localhost:8000/api/risks/");

  const event_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "efficiency", title: "Eficacia" },
    { key: "actions", title: "Acciones" }
  ];

  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
    { key: "details", title: "Detalles" },
  ];

  const events_data = fetchEvents.data;
  const risks_data = fetchRisks.data;

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      controls: selectedEventIds,
      risks: selectedRisksIds,
    };

    if (editMode) {
      // Lógica para actualizar un riesgo existente (PUT)
      console.log("Actualizar riesgo:", requestData);
      try {
        const response = await fetch(
          `http://localhost:8000/api/risks/${initialValues.id}`,
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
        console.error("Error al actualizar el riesgo:", error);
      }
    } else {
      // Lógica para crear un nuevo riesgo (POST)
      console.log("Crear nuevo riesgo:", requestData);
      try {
        const response = await fetch("http://localhost:8000/api/risks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const resp = await response.json();
        console.log(resp);
      } catch (error) {
        console.error("Error al crear el nuevo riesgo:", error);
      }
    }
  };

  const form = useForm({
    initialValues: initialValues || {
      name: "",
      impact: "",
      probability: "",
      details: "",
      //Falta afecta funcionamiento (en backend y front)
    },

    validate: (values) => {
      // Validaciones de cada step
      if (active === 0) {
        return {
          name: values.name ? null : "Ingrese un nombre del riesgo",
          probability: values.probability
            ? null
            : "Ingrese una probabilidad de ocurrencia",
          impact: values.impact ? null : "Ingrese el impacto del riesgo",
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

  console.log(initialValues);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* Modal content */}
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Crear proceso" description="Información general">
          <Stack>
            <TextInput
              required
              radius="md"
              size="md"
              label="Nombre"
              placeholder="Proceso 1"
              description="Ingrese un nombre para el proceso"
              inputWrapperOrder={["label", "description", "input", "error"]}
              {...form.getInputProps("name")}
            />
            
            <Textarea
              radius="md"
              size="md"
              label="Descripción"
              placeholder="Breve descripción"
              description="Ingrese una breve descripción del proceso"
              inputWrapperOrder={["label", "description", "input", "error"]}
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
          description="Asociar eventos, riesgos, etc"
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
                <Tabs.Tab
                  value="controles"
                  leftSection={<IconAdjustmentsAlt />}
                >
                  Eventos
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="riesgos" p={"sm"}>
                <Stack>
                  <Group justify="space-between">
                    <Title order={5}>Riesgos asociados</Title>
                  </Group>
                  {!fetchRisks.isLoading && (
                    <TableAsociation
                      data={risks_data}
                      columns={risk_columns}
                      selectedIds={selectedRisksIds}
                      setSelectedIds={setSelectedRisksIds}
                    />
                  )}
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="eventos" p={"sm"}>
                <Stack>
                  <Group justify="space-between">
                    <Title order={5}>Eventos asociados</Title>
                  </Group>
                  {!fetchEvents.isLoading && (
                    <TableAsociation
                      data={events_data}
                      columns={event_columns}
                      selectedIds={selectedEventIds}
                      setSelectedIds={setSelectedEventIds}
                    />
                  )}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Group>
        </Stepper.Step>

        <Stepper.Completed>
          Aquí va un resumen del registro del riesgo
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-around" mt="xl">
        <Group>
          <Button variant="default" onClick={prevStep}>
            Volver
          </Button>

          {active === 2 ? (
            <Button key={"submit"} type="submit">
              {editMode ? "Actualizar" : "Registrar"}
            </Button>
          ) : (
            <Button onClick={nextStep}>Next step</Button>
          )}
        </Group>

        {/*<Group>
              <Button onClick={nextStep} color="green" >Guardar cambios</Button>
            </Group>*/}
      </Group>
    </form>
  );
};
