import React, { useMemo } from "react";
import styled from "styled-components";

interface ApartmentDetailsModalProps {
   id: string;
   apt: number;
   name: string;
   age: string;
   mostLonely: String;
   lonelinessMeans: String;
   firstTime: String;
   lastTime: String;
}

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = ({
   apt,
   name,
   age,
   mostLonely,
   lonelinessMeans,
   firstTime,
   lastTime
}) => {
   const StyledDetailsModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         height: 700px;
         min-height: 50vh;
         max-height: 90vh;
         overflow-y: hidden;

         .top-color {
            width: 100%;
            min-height: 40px;
            max-height: 40px;
            background-color: ${({ theme }) => theme.Blue};
            border-radius: 22px 22px 0 0;
            transform: translateY(-2px);
            margin-bottom: 10px;
         }

         .apartment-modal-details {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-right: 3px;
            margin: 0 28px 34px 28px;
            overflow: auto;

            .line {
               display: inline-block;
               content: "";
               min-height: 4px;
               max-height: 4px;
               width: 32px;
               background-color: ${({ theme }) => theme.Blue};
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
                  color: ${({ theme }) => theme.LightBlue};
                  font-size: 20px;
                  font-weight: 900;
                  letter-spacing: 1px;
                  line-height: 41px;
               }

               .details-header-divider {
                  font-family: lato, sans-serif;
                  padding: 0 20px;
                  flex-grow: 1;
                  color: ${({ theme }) => theme.LightBlue};
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
                  ${({ theme }) => theme.LightBlue};

                  font-family: "lato", sans-serif;
                  font-weight: 900;
                  letter-spacing: 1px;
                  font-size: 12px;
                  pointer-events: none;
               }
            }
         }
      `,
      []
   );

   return (
      <StyledDetailsModal>
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
      </StyledDetailsModal>
   );
};

export default ApartmentDetailsModal;
