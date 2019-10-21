import React from "react";
import PostList from "../components/PostList";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_POSTS = gql`
   {
      posts {
         id
         title
         body
      }
   }
`;

const Posts = () => {
   const { loading, error, data, fetchMore } = useQuery(GET_POSTS);

   if (loading) return <>Loading...</>;
   if (error) return <>{error.message}</>;

   return (
      <>
         <PostList posts={data.posts} />
      </>
   );
};

export default Posts;
