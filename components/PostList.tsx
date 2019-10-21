import React from "react";
import Link from "next/link";

const PostList = ({ posts }) => {
   if (posts && posts.length > 0) {
      return posts.map(({ id, title, body }) => (
         <div key={id}>
            <Link href={`/p/[title]`} as={`/p/${title}`}>
               <h1>{title}:</h1>
            </Link>

            <p>--------{body}</p>
         </div>
      ));
   }

   return <>No posts to show</>;
};

export default PostList;
