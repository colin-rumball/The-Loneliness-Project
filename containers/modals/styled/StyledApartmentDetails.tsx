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
   color: string;
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
   showRightArrow: true,
   color: "#e7c9b1"
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
      showRightArrow,
      color
   } = {
      ...StyledApartmentDetailsDefaultProps,
      ...props
   };

   const StyledApartmentDetails = useMemo(
      () => styled.div`
         overflow-x: hidden;

         .top-color {
            position: absolute;
            top: 1px;
            left: 1px;
            right: 1px;
            min-height: 40px;
            max-height: 40px;
            background-color: ${color};
         }

         .apartment-modal-details {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-right: 3px;
            padding-top: 60px;
            margin: 24px 25px 34px 35px;
            overflow: auto;

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               margin: 24px 40px 34px 50px;
            }

            .line {
               display: inline-block;
               content: "";
               min-height: 4px;
               max-height: 4px;
               width: 32px;
               background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Blue};
               margin: 30px 0;
            }

            .apartment-modal-details__question {
               font-family: "lato", sans-serif;
               color: rgb(34, 34, 34);
               font-size: 14px;
               font-weight: 700;
               letter-spacing: 1px;
               margin-bottom: 5px;
            }

            .apartment-modal-details__answer {
               color: rgb(34, 34, 34);
               font-size: 18px;
               font-weight: 400;
               margin-bottom: 25px;
            }

            .details-header {
               width: 100%;
               display: flex;
               flex-direction: column;
               flex-wrap: nowrap;
               align-items: baseline;
               overflow: hidden;

               @media (min-width: ${({ theme }: ThemeContainer) =>
                     theme.VARIABLES.BREAK_POINTS.LARGE}) {
                  flex-direction: row;
               }

               .apt-owner-name {
                  font-size: 52px;
                  font-weight: 100;
                  color: rgb(34, 34, 34);
                  line-height: 41px;
                  margin: 0;
                  padding: 0;
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
                  max-width: 50px;
                  display: none;

                  @media (min-width: ${({ theme }: ThemeContainer) =>
                        theme.VARIABLES.BREAK_POINTS.LARGE}) {
                     display: inline-block;
                  }
               }

               .apt-owner-age {
                  font-family: lato, sans-serif;
                  color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
                  font-size: 20px;
                  font-weight: 900;
                  letter-spacing: 1px;
                  line-height: 41px;
               }

               .apt-number {
                  text-align: left;
                  flex-grow: 3;
                  align-self: auto;
                  margin-bottom: 15px;

                  font-family: "lato", sans-serif;
                  font-weight: 900;
                  letter-spacing: 1px;
                  font-size: 12px;
                  pointer-events: none;
                  order: -1;

                  @media (min-width: ${({ theme }: ThemeContainer) =>
                        theme.VARIABLES.BREAK_POINTS.LARGE}) {
                     margin-bottom: 0;
                     align-self: center;
                     text-align: right;
                     order: 0;
                  }
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
      [color]
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
                  <div
                     className="apartment-modal-details__answer"
                     dangerouslySetInnerHTML={{ __html: lastTime }}
                  ></div>
               </>
            )}
            {lonelinessMeans && (
               <>
                  <div className="apartment-modal-details__question">
                     TO ME, LONELINESS MEANS...
                  </div>
                  <div
                     className="apartment-modal-details__answer"
                     dangerouslySetInnerHTML={{ __html: lonelinessMeans }}
                  ></div>
               </>
            )}
            {firstTime && (
               <>
                  <div className="apartment-modal-details__question">
                     ONE OF THE FIRST TIMES I REALIZED I WAS LONELY WAS...
                  </div>
                  <div
                     className="apartment-modal-details__answer"
                     dangerouslySetInnerHTML={{ __html: firstTime }}
                  ></div>
               </>
            )}
            {mostLonely && (
               <>
                  <div className="apartment-modal-details__question">
                     TELL ME THE STORY OF THE TIME YOU FELT THE MOST LONELY.
                  </div>
                  <div
                     className="apartment-modal-details__answer"
                     dangerouslySetInnerHTML={{ __html: mostLonely }}
                  ></div>
               </>
            )}
         </div>
         <div className="gradient-bottom" />
      </StyledApartmentDetails>
   );
};

export default StyledApartmentDetails;
