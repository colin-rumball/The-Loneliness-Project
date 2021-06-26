import { useRouter } from "next/router";
import React, { MutableRefObject, useContext } from "react";
import ApartmentDetailsModal from "../modals/ApartmentDetailsModal";
import StyledApartment from "./StyledApartment";
import useModalSystemHelper from "../../hooks/useModalSystemHelper";
import { StoriesContext } from "../../contexts/StoriesContext";

interface RenderStoriesProps {
   lastApartmentRef: MutableRefObject<any>;
   shownAmount: number;
}

const RenderStoriesDefaultProps: RenderStoriesProps = {
   lastApartmentRef: undefined,
   shownAmount: 0,
};

const RenderStories: React.FC<RenderStoriesProps> = (props) => {
   const stories: any[] = useContext(StoriesContext);
   const { lastApartmentRef, shownAmount } = { ...RenderStoriesDefaultProps, ...props };
   console.log("🚀 ~ file: RenderStories.tsx ~ line 21 ~ shownAmount", shownAmount);
   const router = useRouter();
   const { pushModal } = useModalSystemHelper();

   if (stories.length == 0) return null;

   return (
      <>
         {stories
            .filter((story, index) => index < shownAmount && story.published)
            .map((story, index, arr) => (
               <StyledApartment
                  ref={index == arr.length - 1 ? lastApartmentRef : null}
                  key={story.apt}
                  srcset={`/apartments/small/storey_${story.apt}_small.png 360w, /apartments/medium/storey_${story.apt}_medium.png 640w, /apartments/large/storey_${story.apt}_large.png 920w`}
                  src={`/apartments/medium/storey_${story.apt}_medium.png`}
                  onClick={() => {
                     // Replace the url with a query for the current story
                     const href = `/?a=${story.apt}`;
                     router.replace(href, href, {
                        shallow: true,
                     });

                     // Push the detailed modal
                     pushModal(
                        <ApartmentDetailsModal
                           highestApartmentNum={stories[0].apt}
                           apt={story.apt}
                        />,
                        {
                           onClose: () => {
                              const href = `/`;
                              router.replace(href, href, {
                                 shallow: true,
                              });
                           },
                        }
                     );
                  }}
               />
            ))}
      </>
   );
};

export default RenderStories;
