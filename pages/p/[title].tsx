import React from "react";
import { useRouter } from "next/router";

const Post = () => {
   const router = useRouter();
   const { id } = router.query;

   return <>{id}</>;
};

export default Post;
