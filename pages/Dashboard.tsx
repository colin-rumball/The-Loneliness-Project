import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
   const router = useRouter();
   const token = useLocalStorage("token");

   if (!token) {
      if (typeof window !== "undefined") router.replace("/");
      return (
         <>
            <div>Add / Edit Apartments</div>
            <div>Add / Remove Accounts</div>
            <div>Logout</div>
         </>
      );
   }

   return <>You are authenticated</>;
};

export default Dashboard;
