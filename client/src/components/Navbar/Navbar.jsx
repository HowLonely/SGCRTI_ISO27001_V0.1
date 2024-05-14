import { useState } from "react";
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

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "procesos", label: "Procesos", icon: IconSubtask },
  { link: "riesgos", label: "Riesgos", icon: IconAlertTriangle },
  { link: "", label: "Controles", icon: IconAdjustmentsAlt },
  { link: "", label: "Activos de información", icon: IconAlertOctagon },
  /*{ link: "", label: "Causas y consecuencias", icon: IconLicense },*/
  { link: "", label: "Eventos", icon: IconCalendarEvent },
  { link: "", label: "Planes de acción", icon: IconCalendarCheck },
  /*{ link: "", label: "Reportes", icon: IconReportAnalytics },
  { link: "", label: "Indicadores", icon: IconTimeline },
  { link: "", label: "Evaluaciones", icon: IconNotes },*/
];

export function Navbar({ user }) {
  const [active, setActive] = useState("Billing");

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

  if (!user) return;

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UserButton user={user} />
        <a
          href="/auth/"
          className={classes.link}
          onClick={() => logout()(dispatch)}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar sesión</span>
        </a>
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
