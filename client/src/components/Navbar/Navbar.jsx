import { useState, useEffect } from "react";
import {
  IconDashboard,
  IconAlertTriangle,
  IconAdjustmentsAlt,
  //IconNotes,
  IconCalendarCheck,
  IconCalendarEvent,
  //IconReportAnalytics,
  //IconTimeline,
  IconSubtask,
  IconLogout,
  IconAlertOctagon,
  //IconLicense,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { NavLink } from "react-router-dom";
import { UserButton } from "../UserButton/UserButton";
import { logout } from "../../reducer/Actions";

import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { Button, Flex, Loader } from "@mantine/core";

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "procesos", label: "Procesos", icon: IconSubtask },
  { link: "riesgos", label: "Riesgos", icon: IconAlertTriangle },
  { link: "controles", label: "Controles de seguridad", icon: IconAdjustmentsAlt },
  { link: "activos", label: "Activos de información", icon: IconAlertOctagon },
  /*{ link: "", label: "Causas y consecuencias", icon: IconLicense },*/
  { link: "incidentes", label: "Incidentes", icon: IconCalendarEvent },
  { link: "planes", label: "Planes de acción", icon: IconCalendarCheck },
  /*{ link: "", label: "Reportes", icon: IconReportAnalytics },
  { link: "", label: "Indicadores", icon: IconTimeline },
  { link: "", label: "Evaluaciones", icon: IconNotes },*/
];

export function Navbar({ user }) {
  const [active, setActive] = useState("Dashboard");

  const dispatch = useDispatch();

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  if (!user) {
    return (
      <Flex justify="center" align="center">
        <Loader size="sm" /> {/* Indicador de carga mientras se verifica */}
      </Flex>
    );
  }
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UserButton user={user} />
        <Button
          variant="light"
          fullWidth
          color="red"
          href="/auth/"
          onClick={() => logout()(dispatch)}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          Cerrar sesión
        </Button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // Agrega aquí otras propiedades de usuario que esperas recibir
  }).isRequired,
};
