import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Dashboard } from "./Dashboard";
import { AppShell, Burger, Group } from "@mantine/core";
import { Procesos } from "./Procesos";
import WrappedRiesgos from "./Riesgos";
import WrappedControles from "./Controles";
import { Activos } from "./Activos";
import WrappedIncidentes from "./Incidentes";
import { Planes } from "./Planes";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "../../components/DarkMode/ActionToggle";

import { MantineLogo } from "@mantinex/mantine-logo";
import PrivateRoute from "../../routes/PrivateRoute";
import { useSelector } from "react-redux";

export const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  const userSelector = useSelector((state) => state.AuthReducer.user);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p={"sm"}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="md"
            />
            <MantineLogo size={38} />
          </Group>
          <Group>
            <ActionToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar user={userSelector} />
        {/*console.log(userSelector)*/}
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route element={<PrivateRoute />}>
            {/*Falta el element para * */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/procesos" element={<Procesos />} />
            <Route path="/riesgos" element={<WrappedRiesgos />} />
            <Route path="/controles" element={<WrappedControles />} />
            <Route path="/activos" element={<Activos />} />
            <Route path="/incidentes" element={<WrappedIncidentes />} />
            <Route path="/planes" element={<Planes />} />
          </Route>
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};
