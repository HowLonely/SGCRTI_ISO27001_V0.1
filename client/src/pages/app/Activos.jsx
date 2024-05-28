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
  
  export const Activos = () => {
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
            title="Crear Activo de Información"
            size={"xl"}
            centered
          >
            <div style={{ width: '100%' }}>
              <Stepper active={active} onStepClick={setActive} breakpoint="sm">
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
                      inputWrapperOrder={["label", "description", "input", "error"]}
                    />
                    <Textarea
                      required
                      radius="md"
                      size="md"
                      label="Descripción del Activo"
                      placeholder="Breve descripción"
                      description="Ingrese una breve descripción del activo"
                      inputWrapperOrder={["label", "description", "input", "error"]}
                    />
                    <TextInput
                      required
                      radius="md"
                      size="md"
                      label="Criticidad"
                      placeholder="Porcentaje de criticidad"
                      description="Ingrese el porcentaje de criticidad para la organización"
                      inputWrapperOrder={["label", "description", "input", "error"]}
                    />
                    <Select
                      required
                      radius="md"
                      size="md"
                      label="Tipo de Activo"
                      placeholder="Seleccione el tipo de activo"
                      description="Seleccione el tipo de activo de información"
                      data={[
                        { value: 'hardware', label: 'Hardware' },
                        { value: 'software', label: 'Software' },
                        { value: 'data', label: 'Datos' },
                        { value: 'people', label: 'Personas' },
                        { value: 'facilities', label: 'Instalaciones' },
                      ]}
                      inputWrapperOrder={["label", "description", "input", "error"]}
                    />
                  </Stack>
                </Stepper.Step>
  
                <Stepper.Step
                  label="Asociar Activo"
                  description="Asociar a riesgos, procesos, etc."
                >
                  <Stack>
                    <TextInput
                      radius="md"
                      size="md"
                      label="Asociación a Riesgos"
                      placeholder="Nombre del Riesgo"
                      description="Ingrese el nombre del riesgo al que está asociado el activo"
                      inputWrapperOrder={["label", "description", "input", "error"]}
                    />
                    <TextInput
                      radius="md"
                      size="md"
                      label="Asociación a Procesos"
                      placeholder="Nombre del Proceso"
                      description="Ingrese el nombre del proceso al que está asociado el activo"
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
                      description="Ingrese cómo se evaluará la efectividad del activo"
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
            </div>
  
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Volver
              </Button>
              <Button onClick={nextStep}>Continuar</Button>
            </Group>
          </Modal>
  
          <Button onClick={open} variant="outline" size="md" radius={"md"}>
            Agregar Activo
          </Button>
        </Flex>
      </Stack>
    );
  };
  