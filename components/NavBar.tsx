import React, { useMemo } from "react";
import { useRouter } from "next/router";
import LoginModal from "./../containers/modals/LoginModal";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// const IS_LOGGED_IN = gql`
//    {
//       isLoggedIn @client
//    }
// `;

const ME = gql`
   query {
      me {
         name
      }
   }
`;

const NavBar = () => {
   // const { data: loggedInData } = useQuery(IS_LOGGED_IN);
   const { data: userData } = useQuery(ME);
   const isLoggedIn = React.useMemo(() => !!userData && !!userData.me, [userData]);

   const router = useRouter();
   const currentPage = useMemo(() => router.pathname.split("/")[1], [router.route]);
   return (
      <>
         {/* <Menu className="nav-menu">
            <Menu.Item header>Blog Me</Menu.Item>
            <Menu.Item
               className="nav-item"
               name="home"
               active={currentPage === ""}
               onClick={() => router.push("/")}
            />
            <Menu.Item
               className="nav-item"
               name="Posts"
               active={currentPage === "Posts"}
               onClick={() => router.push("/Posts")}
            />
            {isLoggedIn && (
               <Menu.Item
                  className="nav-item"
                  name="My Posts"
                  active={currentPage === "MyPosts"}
                  onClick={() => router.push("/MyPosts")}
               />
            )}

            {isLoggedIn ? (
               <Menu.Item position="right">Hello, {userData.me.name}</Menu.Item>
            ) : (
               <Menu.Item className="nav-button" position="right">
                  <LoginModal />
               </Menu.Item>
            )}
         </Menu> */}
      </>
   );
};

export default NavBar;
