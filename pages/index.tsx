import React, { useState, useEffect, useMemo } from "react";
import { withRouter } from "next/router";
import { gql, NetworkStatus } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import useModal from "../hooks/useModal";
import Button from "../components/Base/Button/Button";
import NavigationMenu, { MenuDirection } from "../components/Base/NavigationMenu/NavigationMenu";
import NavigationMenuItem from "../components/Base/NavigationMenu/NavigationMenuItem";
import Card, { CardSize } from "../components/Base/Card/Card";
import TestQuery from "../containers/TestQuery";
import CardGrid from "../components/Base/CardGrid/CardGrid";
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import SidebarController from "../components/SidebarController";
import LogoHeader from "../containers/LogoHeader";
import Apartments from "../containers/Apartments";

const ResponsiveGridLayout = WidthProvider(Responsive);

const HomePage = props => {
   return (
      <>
         <SidebarController />
         <LogoHeader />
         <Apartments />
      </>
   );
};

export default withRouter(HomePage);
