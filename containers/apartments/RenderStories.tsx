import { ApolloClient } from "apollo-boost";
import { useRouter } from "next/router";
import React, { MutableRefObject } from "react";
import ApartmentDetailsModal from "../modals/ApartmentDetailsModal";
import StyledApartment from "./StyledApartment";
import { useModalContext } from "../../contexts/ModalContext";

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
   const { pushModal } = useModalContext();

   if (stories.length == 0) return null;

   return (
      <>
         {stories.map((story, index) => (
            <StyledApartment
               ref={index == stories.length - 1 ? lastApartmentRef : null}
               key={story.id}
               image={`/static/apartments/storey_${story.apt}.png`}
               onClick={() => {
                  // Replace the url with a query for the current story
                  const href = `/?a=${story.apt}`;
                  router.replace(href, href, {
                     shallow: true
                  });

                  // Push the detailed modal
                  pushModal(
                     <ApartmentDetailsModal
                        router={router}
                        apartmentsStart={stories[0].apt}
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
