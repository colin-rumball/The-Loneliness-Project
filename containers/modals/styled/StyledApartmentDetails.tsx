import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import Arrows from "../../../components/Arrows";
import { useRouter } from "next/router";
import { ThemeContainer } from "../../../themes/common";

interface StyledApartmentDetailsProps {
   apt: number;
   name: string;
   age: string;
   mostLonely: string;
   lonelinessMeans: string;
   firstTime: string;
   lastTime: string;
   onLeftArrowClicked?(apt: number);
   onRightArrowClicked?(apt: number);
   showLeftArrow?: boolean;
   showRightArrow?: boolean;
}

const StyledApartmentDetailsDefaultProps: StyledApartmentDetailsProps = {
   apt: 1,
   name: "",
   age: "",
   mostLonely: "",
   lonelinessMeans: "",
   firstTime: "",
   lastTime: "",
   onLeftArrowClicked: () => {},
   onRightArrowClicked: () => {},
   showLeftArrow: true,
   showRightArrow: true
};

const StyledApartmentDetails: React.FC<StyledApartmentDetailsProps> = props => {
   const {
      apt,
      name,
      age,
      mostLonely,
      lonelinessMeans,
      firstTime,
      lastTime,
      onLeftArrowClicked,
      onRightArrowClicked,
      showLeftArrow,
      showRightArrow
   } = {
      ...StyledApartmentDetailsDefaultProps,
      ...props
   };

   const StyledApartmentDetails = useMemo(
      () => styled.div`
         overflow-x: hidden;

         .top-color {
            position: absolute;
            left: 0;
            right: 0;
            min-height: 40px;
            max-height: 40px;
            border: 1px solid rgba(0, 0, 0, 0.9);
            background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Blue};
         }

         .apartment-modal-details {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-right: 3px;
            padding-top: 40px;
            margin: 24px 40px 34px 50px;
            overflow: auto;

            .line {
               display: inline-block;
               content: "";
               min-height: 4px;
               max-height: 4px;
               width: 32px;
               background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Blue};
               margin-bottom: 22px;
            }

            .apartment-modal-details__question {
               font-family: "lato", sans-serif;
               color: rgb(34, 34, 34);
               font-size: 14px;
               font-weight: 700;
               letter-spacing: 1px;
            }

            .apartment-modal-details__answer {
               color: rgb(34, 34, 34);
               font-size: 18px;
               font-weight: 400;
               margin-bottom: 22px;
            }

            .details-header {
               width: 100%;
               display: flex;
               flex-wrap: nowrap;
               align-items: baseline;
               margin-bottom: 22px;

               .apt-owner-name {
                  font-size: 52px;
                  font-weight: 100;
                  color: rgb(34, 34, 34);
                  line-height: 41px;
                  margin: 0;
                  padding: 0;
               }
               .apt-owner-age {
                  font-family: lato, sans-serif;
                  color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
                  font-size: 20px;
                  font-weight: 900;
                  letter-spacing: 1px;
                  line-height: 41px;
               }

               .details-header-divider {
                  font-family: lato, sans-serif;
                  padding: 0 20px;
                  flex-grow: 1;
                  color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
                  font-size: 20px;
                  font-weight: 900;
                  letter-spacing: 1px;
                  line-height: 41px;
                  text-align: center;
               }

               .apt-number {
                  text-align: right;
                  flex-grow: 3;
                  align-self: flex-start;

                  font-family: "lato", sans-serif;
                  font-weight: 900;
                  letter-spacing: 1px;
                  font-size: 12px;
                  pointer-events: none;
               }
            }
         }

         .gradient-bottom {
            position: absolute;
            left: 1px;
            right: 1px;
            bottom: 1px;
            background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #fff);
            min-height: 40px;
            max-height: 40px;
         }
      `,
      []
   );

   return (
      <StyledApartmentDetails>
         <Arrows
            currentApt={apt}
            onLeftArrowClicked={onLeftArrowClicked}
            onRightArrowClicked={onRightArrowClicked}
            showLeftArrow={showLeftArrow}
            showRightArrow={showRightArrow}
         />
         <div className="top-color" />
         <div className="apartment-modal-details">
            <div className="details-header">
               <span className="apt-owner-name">{name}</span>
               <span className="details-header-divider">/</span>
               <span className="apt-owner-age">AGE {age}</span>
               <span className="apt-number">APT. {apt}</span>
            </div>
            <div className="line"></div>
            {lastTime && (
               <>
                  <div className="apartment-modal-details__question">
                     LAST TIME I FELT LONELY WAS...
                  </div>
                  <div className="apartment-modal-details__answer">{lastTime}</div>
               </>
            )}
            {lonelinessMeans && (
               <>
                  <div className="apartment-modal-details__question">
                     TO ME, LONELINESS MEANS...
                  </div>
                  <div className="apartment-modal-details__answer">{lonelinessMeans}</div>
               </>
            )}
            {firstTime && (
               <>
                  <div className="apartment-modal-details__question">
                     ONE OF THE FIRST TIMES I REALIZED I WAS LONELY WAS...
                  </div>
                  <div className="apartment-modal-details__answer">{firstTime}</div>
               </>
            )}
            {mostLonely && (
               <>
                  <div className="apartment-modal-details__question">
                     TELL ME THE STORY OF THE TIME YOU FELT THE MOST LONELY.
                  </div>
                  <div className="apartment-modal-details__answer">{mostLonely}</div>
               </>
            )}
         </div>
         <div className="gradient-bottom" />
      </StyledApartmentDetails>
   );
};

export default StyledApartmentDetails;
