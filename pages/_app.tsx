import React from "react";
import App, { Container as NextAppContainer } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import SiteHeader from "./../containers/SiteHeader";
import { PusherProvider } from "../lib/pusher/PusherProvider";
import withApolloClient from "../lib/apollo/withApolloClient";
import PageContainer from "../components/Base/PageContainer/PageContainer";
import NavigationMenu, { MenuDirection } from "../components/Base/NavigationMenu/NavigationMenu";
import NavigationMenuItem from "../components/Base/NavigationMenu/NavigationMenuItem";
import PageHeader from "../components/Base/PageHeader/PageHeader";
import Sidebar from "../components/Base/Sidebar/Sidebar";
import SidebarController from "../components/Base/SidebarController/SidebarController";
import { FaBars } from "react-icons/fa";
import SidebarNavItem from "../components/SidebarNavItem";
import Avatar from "../components/Avatar";
import SideNavigation from "../containers/SideNavigation";
import "./../styles/main.scss";
import "react-grid-layout/css/styles.css";

class MyApp extends App {
   // static async getInitialProps({ Component, ctx }) {
   //    let pageProps = {};

   //    if (Component.getInitialProps) {
   //       pageProps = await Component.getInitialProps(ctx);
   //    }
   //    return { pageProps };
   // }

   render() {
      const { Component, pageProps, router, apolloClient } = this.props as any;
      return (
         <NextAppContainer>
            <ApolloProvider client={apolloClient}>
               <PusherProvider>
                  <PageContainer
                     header={
                        <PageHeader
                           left={
                              <SidebarController
                                 controller={<FaBars />}
                                 sidebar={<SideNavigation />}
                              />
                           }
                        />
                     }
                     left={<SideNavigation />}
                  >
                     <Component {...pageProps} key={router.route} />
                  </PageContainer>
               </PusherProvider>
            </ApolloProvider>
         </NextAppContainer>
      );
   }
}

export default withApolloClient(MyApp);
