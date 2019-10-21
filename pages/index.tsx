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

const ResponsiveGridLayout = WidthProvider(Responsive);

const HomePage = props => {
   const { pushModal } = useModal();

   var layouts = {
      lg: [
         { i: "a", x: 0, y: 0, w: 6, h: 2, static: true },
         { i: "b", x: 6, y: 0, w: 6, h: 1, static: true },
         { i: "c", x: 6, y: 1, w: 6, h: 1, static: true },
         { i: "d", x: 0, y: 2, w: 3, h: 2, static: true },
         { i: "e", x: 3, y: 2, w: 3, h: 2, static: true },
         { i: "f", x: 6, y: 2, w: 3, h: 2, static: true },
         { i: "g", x: 9, y: 2, w: 3, h: 2, static: true }
      ],
      md: [
         { i: "a", x: 0, y: 0, w: 12, h: 2, static: true },
         { i: "b", x: 6, y: 0, w: 6, h: 1, static: true },
         { i: "c", x: 6, y: 1, w: 6, h: 1, static: true },
         { i: "d", x: 0, y: 2, w: 3, h: 2, static: true },
         { i: "e", x: 3, y: 2, w: 3, h: 2, static: true },
         { i: "f", x: 6, y: 2, w: 3, h: 2, static: true },
         { i: "g", x: 9, y: 2, w: 3, h: 2, static: true }
      ],
      sm: [
         { i: "a", x: 0, y: 0, w: 12, h: 2, static: true },
         { i: "b", x: 0, y: 2, w: 12, h: 1, static: true },
         { i: "c", x: 0, y: 3, w: 12, h: 1, static: true },
         { i: "d", x: 0, y: 4, w: 6, h: 2, static: true },
         { i: "e", x: 6, y: 4, w: 6, h: 2, static: true },
         { i: "f", x: 0, y: 6, w: 6, h: 2, static: true },
         { i: "g", x: 6, y: 6, w: 6, h: 2, static: true }
      ]
   };

   return (
      <ResponsiveGridLayout
         className="layout"
         layouts={layouts}
         breakpoints={{ lg: 900, md: 768, sm: 480 }}
         cols={{ lg: 12, md: 12, sm: 12 }}
      >
         <Card key="a">a</Card>
         <Card key="b">b</Card>
         <Card key="c">c</Card>
         <Card key="d">d</Card>
         <Card key="e">e</Card>
         <Card key="f">f</Card>
         <Card key="g">g</Card>
      </ResponsiveGridLayout>
   );
};

export default withRouter(HomePage);
