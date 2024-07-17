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

export const Riesgos = () => {
  const [openedModal, { open, close }] = useDisclosure(false);

  const [active, setActive] = useState(0);

  const [checked, setChecked] = useState(false);

  // IDS de las asociaciones seleccionadas
  const [selectedControlIds, setSelectedControlIds] = useState([]);
  const [selectedProcessIds, setSelectedProcessIds] = useState([]);

  // Fetchear datos PROBLEMAS AL RENDERIZA
  const fetchControl = useFetch("http://localhost:8000/api/controls/");
  const fetchProcess = useFetch("http://localhost:8000/api/processes/");
  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  // METODO POST DEL FORMULARIO
  const handleSubmit = async (data) => {
    const requestData = {
      ...data,
      controls: selectedControlIds,
      processes: selectedProcessIds,
    };
    console.log(requestData);
    /*
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
      console.error("Error submitting form:", error);
    }¨
    */
  };

  // Datos de las tablas
  // Las KEY deben ser los nombres de las columnas de las tablas en el backend (Se podría hacer un mockup)
  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
  ];

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
  const risks_data = fetchRisk.data;

  const form = useForm({
    initialValues: {
      name: "",
      probability: "",
      details: "",
      impact: "",
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

  return (
    <Stack>
      <Group justify={"flex-start"}>
        {/* BODY */}
        <Modal
          h={300}
          opened={openedModal}
          onClose={close}
          title="Crear riesgo"
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
                label="Crear riesgo"
                description="Información general"
              >
                <Stack>
                  <TextInput
                    required
                    radius="md"
                    size="md"
                    label="Nombre"
                    placeholder="Riesgo 1"
                    description="Ingrese un nombre para el riesgo"
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
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
                          { value: "0.3", label: "Posible 30%" },
                          { value: "0.45", label: "Ocasional 45%" },
                          { value: "0.6", label: "Ocasional 60%" },
                          { value: "0.75", label: "Ocasional 75%" },
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
                          { value: "0.3", label: "Menor 30%" },
                          { value: "0.45", label: "Moderado 45%" },
                          { value: "0.6", label: "Mayor 60%" },
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
                    inputWrapperOrder={[
                      "label",
                      "description",
                      "input",
                      "error",
                    ]}
                    {...form.getInputProps("details")}
                  />
                  <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
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
                          <Button
                            variant="outline"
                            leftSection={<IconCirclePlus size={22} />}
                            size="sm"
                          >
                            Nuevo proceso
                          </Button>
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
                          <Button
                            variant="outline"
                            leftSection={<IconCirclePlus size={22} />}
                            size="sm"
                          >
                            Nuevo control
                          </Button>
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
                    Registrar
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
        </Modal>

        <Button onClick={open} variant="outline" size="md" radius={"md"}>
          Agregar riesgo
        </Button>
      </Group>

      {!fetchRisk.isLoading && (
        <TableCustom data={risks_data} columns={risk_columns} />
      )}
    </Stack>
  );
};
