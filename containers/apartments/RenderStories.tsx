import { ApolloClient } from "apollo-boost";
import { useRouter } from "next/router";
import React, { MutableRefObject, useCallback } from "react";
import ApartmentDetailsModal from "../modals/ApartmentDetailsModal";
import StyledApartment from "./StyledApartment";
import useModalSystemHelper from "../../hooks/useModalSystemHelper";

interface RenderStoriesProps {
   stories: any[];
   client: ApolloClient<any>;
   lastApartmentRef: MutableRefObject<any>;
}

const RenderStoriesDefaultProps: RenderStoriesProps = {
   stories: [],
   client: undefined,
   lastApartmentRef: undefined
};

const RenderStories: React.FC<RenderStoriesProps> = props => {
   const { stories, client, lastApartmentRef } = { ...RenderStoriesDefaultProps, ...props };
   const router = useRouter();
   const { pushModal } = useModalSystemHelper();

   if (stories.length == 0) return null;

   return (
      <>
         {stories.map((story, index) => (
            <StyledApartment
               ref={index == stories.length - 1 ? lastApartmentRef : null}
               key={story.id}
               srcset={`/static/apartments/small/storey_${story.apt}_small.png 360w, /static/apartments/medium/storey_${story.apt}_medium.png 640w, /static/apartments/large/storey_${story.apt}_large.png 920w`}
               src={`/static/apartments/storey_${story.apt}_medium.png`}
               onClick={() => {
                  // Replace the url with a query for the current story
                  const href = `/?a=${story.apt}`;
                  router.replace(href, href, {
                     shallow: true
                  });

                  // Push the detailed modal
                  pushModal(
                     <ApartmentDetailsModal
                        highestApartmentNum={stories[0].apt}
                        apt={story.apt}
                        apolloClient={client}
                     />,
                     {
                        onClose: () => {
                           const href = `/`;
                           router.replace(href, href, {
                              shallow: true
                           });
                        }
                     }
                  );
               }}
            />
         ))}
      </>
   );
};

export default RenderStories;
