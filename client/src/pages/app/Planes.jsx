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
  } from "@mantine/core";
  import { useDisclosure } from "@mantine/hooks";
  import { useState } from "react";
  
  export const Planes = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [active, setActive] = useState(0);
  
    const nextStep = () =>
      setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
      setActive((current) => (current > 0 ? current - 1 : current));
  
    return (
      <Stack>
        <Flex justify={"flex-start"}>
          <Modal
            opened={opened}
            onClose={close}
            title="Crear Plan de Acción"
            size={"xl"}
            centered
          >
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step
                label="Crear Plan de Acción"
                description="Detalles del plan de acción"
              >
                <Stack>
                  <TextInput
                    required
                    radius="md"
                    size="md"
                    label="Nombre del Plan de Acción"
                    placeholder="Plan de Acción 1"
                    description="Ingrese un nombre para el plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <Textarea
                    required
                    radius="md"
                    size="md"
                    label="Descripción del Plan de Acción"
                    placeholder="Breve descripción"
                    description="Ingrese una breve descripción del plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <Select
                    required
                    radius="md"
                    size="md"
                    label="Responsable del Plan"
                    placeholder="Seleccione el responsable"
                    description="Seleccione el responsable del plan de acción"
                    data={[
                      { value: 'security-team', label: 'Equipo de Seguridad' },
                      { value: 'it-department', label: 'Departamento de TI' },
                      { value: 'hr-department', label: 'Departamento de RRHH' },
                      { value: 'management', label: 'Gerencia' },
                      { value: 'external-consultant', label: 'Consultor Externo' },
                    ]}
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <TextInput
                    required
                    radius="md"
                    size="md"
                    label="Fecha de Inicio"
                    placeholder="YYYY-MM-DD"
                    description="Ingrese la fecha de inicio del plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <TextInput
                    required
                    radius="md"
                    size="md"
                    label="Fecha de Finalización"
                    placeholder="YYYY-MM-DD"
                    description="Ingrese la fecha de finalización del plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <Checkbox
                    radius="md"
                    size="md"
                    label="Notificaciones de Seguimiento"
                    description="Marque para recibir notificaciones de seguimiento del plan"
                  />
                </Stack>
              </Stepper.Step>
  
              <Stepper.Step
                label="Asociar Plan de Acción"
                description="Asociar a riesgos, activos, etc."
              >
                <Stack>
                  <TextInput
                    radius="md"
                    size="md"
                    label="Asociación a Riesgos"
                    placeholder="Nombre del Riesgo"
                    description="Ingrese el nombre del riesgo al que está asociado el plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <TextInput
                    radius="md"
                    size="md"
                    label="Asociación a Activos"
                    placeholder="Nombre del Activo"
                    description="Ingrese el nombre del activo al que está asociado el plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                </Stack>
              </Stepper.Step>
  
              <Stepper.Step
                label="Evaluación y Monitoreo"
                description="Programar revisiones y evaluar efectividad"
              >
                <Stack>
                  <Textarea
                    required
                    radius="md"
                    size="md"
                    label="Método de Evaluación"
                    placeholder="Describa el método de evaluación"
                    description="Ingrese cómo se evaluará la efectividad del plan de acción"
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <Select
                    required
                    radius="md"
                    size="md"
                    label="Frecuencia de Revisión"
                    placeholder="Seleccione la frecuencia"
                    description="Seleccione la frecuencia con la que se revisará"
                    data={[
                      { value: 'monthly', label: 'Mensual' },
                      { value: 'quarterly', label: 'Trimestral' },
                      { value: 'semiannually', label: 'Semestral' },
                      { value: 'annually', label: 'Anual' },
                    ]}
                    inputWrapperOrder={["label", "description", "input", "error"]}
                  />
                  <Checkbox
                    radius="md"
                    size="md"
                    label="Notificaciones de Revisión"
                    description="Marque para recibir notificaciones de revisión"
                  />
                </Stack>
              </Stepper.Step>
  
              <Stepper.Completed>
                Completo, haga clic en el botón Volver para regresar al paso anterior.
              </Stepper.Completed>
            </Stepper>
  
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Volver
              </Button>
              <Button onClick={nextStep}>Continuar</Button>
            </Group>
          </Modal>
  
          <Button onClick={open} variant="outline" size="md" radius={"md"}>
            Crear Plan de Acción
          </Button>
        </Flex>
      </Stack>
    );
  };
  