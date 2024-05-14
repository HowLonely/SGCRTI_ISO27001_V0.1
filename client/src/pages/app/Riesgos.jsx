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
import { RiskTable } from "../../components/Tables/RiskTable";

import { useForm } from "@mantine/form";

export const Riesgos = () => {
  const impactData = [
    "Insignificante 20%",
    "Menor 40%",
    "Moderado 60%",
    "Mayor 80%",
    "Catastrófico 100%",
  ];

  const [openedImpact, { toggle }] = useDisclosure(false);
  const [openedModal, { open, close }] = useDisclosure(false);

  const [active, setActive] = useState(0);

  const [checked, setChecked] = useState(false);

  const form = useForm({
    initialValues: {
      nombre_riesgo: "",
      probabilidad: "",
      impacto: "",
      descripcion: "",
      afecta_funcionamiento: "",
    },

    validate: (values) => {
      // Validaciones de cada step
      if (active === 0) {
        return {
          nombre_riesgo: values.nombre_riesgo
            ? null
            : "Ingrese un nombre del riesgo",
          probabilidad:
            values.probabilidad
              ? null
              : "Ingrese una probabilidad de ocurrencia",
        };
      }

      if (active === 1) {
        return {
          name:
            values.name.trim().length < 2
              ? "Name must include at least 2 characters"
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
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
          opened={openedModal}
          onClose={close}
          title="Crear riesgo"
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
                  inputWrapperOrder={["label", "description", "input", "error"]}
                  {...form.getInputProps("nombre_riesgo")}
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
                        "Improbable",
                        "Posible",
                        "Ocasional",
                        "Probable",
                        "Frecuente",
                      ]
                      /* Estas opciones luego deberán ser parametrizables */
                    }
                    {...form.getInputProps("probabilidad")}
                  />

                  <Stack>
                    <Select
                      required
                      size="md"
                      radius="md"
                      label="Impacto"
                      description="Evalue el impacto que tendrá el riesgo"
                      placeholder="% Impacto total (Promedio)"
                      onClick={toggle}
                    />
                    
                    <Collapse in={openedImpact}>
                      {/* PARAMETRIZAR ESTOS DATOS (IMPACTOS Y DATA)*/}
                      <Fieldset legend="Parámetros de impacto">
                        <Select
                          label="Operacional"
                          placeholder="Seleccionar"
                          data={impactData}
                        />
                        <Select
                          label="Reputacional"
                          placeholder="Seleccionar"
                          data={impactData}
                        />
                        <Select
                          label="Legal"
                          placeholder="Seleccionar"
                          data={impactData}
                        />
                        <Select
                          label="Financiero"
                          placeholder="Seleccionar"
                          data={impactData}
                        />
                        <Select
                          label="Ambiental"
                          placeholder="Seleccionar"
                          data={impactData}
                        />
                      </Fieldset>
                    </Collapse>
                  </Stack>
                </Group>
                <Textarea
                  radius="md"
                  size="md"
                  label="Descripción"
                  placeholder="Breve descripción"
                  description="Ingrese una breve descripción del riesgo"
                  inputWrapperOrder={["label", "description", "input", "error"]}
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
                        <Button
                          variant="outline"
                          leftSection={<IconCirclePlus size={22} />}
                          size="sm"
                        >
                          Nuevo proceso
                        </Button>
                      </Group>
                    </Stack>
                  </Tabs.Panel>

                  <Tabs.Panel value="controles" p={"sm"}>
                    Settings tab
                  </Tabs.Panel>
                </Tabs>
              </Group>
            </Stepper.Step>
            <Stepper.Step
              label="Responsables"
              description="Asignar responsables"
            ></Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>

          <Group justify="space-around" mt="xl">
            <Group>
              <Button variant="default" onClick={prevStep}>
                Volver
              </Button>
              <Button onClick={nextStep}>Continuar</Button>
            </Group>

            {/*<Group>
              <Button onClick={nextStep} color="green" >Guardar cambios</Button>
            </Group>*/}
          </Group>
        </Modal>

        <Button onClick={open} variant="outline" size="md" radius={"md"}>
          Agregar riesgo
        </Button>
      </Group>
      <RiskTable />
    </Stack>
  );
};
