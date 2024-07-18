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

export const RiskForm = ({ initialValues, editMode }) => {
  const [active, setActive] = useState(0);

  // IDS de las asociaciones seleccionadas
  const [selectedControlIds, setSelectedControlIds] = useState([]);
  const [selectedProcessIds, setSelectedProcessIds] = useState([]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Selecciona automáticamente los procesos y controles del riesgo inicial
    if (initialValues && initialValues.processes) {
      setSelectedProcessIds(initialValues.processes);
    }
    if (initialValues && initialValues.controls) {
      setSelectedControlIds(initialValues.controls);
    }
  }, [initialValues]);

  // Fetchear datos
  const fetchControl = useFetch("http://localhost:8000/api/controls/");
  const fetchProcess = useFetch("http://localhost:8000/api/processes/");

  const control_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "efficiency", title: "Eficacia" },
  ];

  const process_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
  ];

  const controls_data = fetchControl.data;
  const processes_data = fetchProcess.data;

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      controls: selectedControlIds,
      processes: selectedProcessIds,
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
        <Stepper.Step label="Crear riesgo" description="Información general">
          <Stack>
            <TextInput
              required
              radius="md"
              size="md"
              label="Nombre"
              placeholder="Riesgo 1"
              description="Ingrese un nombre para el riesgo"
              inputWrapperOrder={["label", "description", "input", "error"]}
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
                data={
                  [
                    { value: "0.15", label: "Improbable 15%" },
                    { value: "0.30", label: "Poco probable 30%" },
                    { value: "0.45", label: "Probable 45%" },
                    { value: "0.60", label: "Muy probable 60%" },
                    { value: "0.75", label: "Frecuente 75%" },
                  ]
                  /* Estas opciones luego deberán ser parametrizables */
                }
                {...form.getInputProps("probability")}
              />

              <Stack>
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
              </Stack>
            </Group>
            <Textarea
              radius="md"
              size="md"
              label="Descripción"
              placeholder="Breve descripción"
              description="Ingrese una breve descripción del riesgo"
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
                      data={processes_data}
                      columns={process_columns}
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
                      data={controls_data}
                      columns={control_columns}
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
