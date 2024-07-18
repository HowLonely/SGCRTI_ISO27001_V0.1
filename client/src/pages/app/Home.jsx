import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Dashboard } from "./Dashboard";
import { AppShell, Burger, Group } from "@mantine/core";
import { Procesos } from "./Procesos";
import { Riesgos } from "./Riesgos";
import { Controles } from "./Controles";
import { Activos } from "./Activos";
import { Eventos } from "./Eventos";
import {Planes} from "./Planes";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "../../components/DarkMode/ActionToggle";

import { MantineLogo } from "@mantinex/mantine-logo";
import PrivateRoute from "../../routes/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, verify } from "../../reducer/Actions";

export const Home = () => {
  const [opened, { toggle }] = useDisclosure();
  console.log("Home component")

  const userSelector = useSelector((state) => state.AuthReducer.user);

  console.log("usser desde home: " + userSelector.email);


  const dispatch = useDispatch();

  useEffect(() => {
    //getUser()(dispatch);
    //verify()(dispatch);
  }, []);

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
        <Navbar user={(userSelector)} />
        {  /*console.log(userSelector)*/}
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route element={<PrivateRoute />}>
            {/*Falta el element para * */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/procesos" element={<Procesos />} />
            <Route path="/riesgos" element={<Riesgos />} />
            <Route path="/controles" element={<Controles/>} />
            <Route path="/activos" element={<Activos/>} />
            <Route path="/eventos" element={<Eventos/>} />
            <Route path="/planes" element={<Planes/>} />
          </Route>
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};
