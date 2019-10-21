import React from "react";
import Link from "next/link";
import PostList from "../components/PostList";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Button from "../components/Base/Button/Button";

const GET_POSTS = gql`
   {
      myPosts {
         id
         title
         body
      }
   }
`;

const MyPosts = () => {
   const { loading, error, data, fetchMore } = useQuery(GET_POSTS);

   if (loading) return <>Loading...</>;
   if (error) return <>{error.message}</>;

   return (
      <>
         <PostList posts={data.myPosts} />
         <Link href="/CreatePost">
            <Button text="Create New Post" />
         </Link>
      </>
   );
};

export default MyPosts;
