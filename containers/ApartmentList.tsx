import React, { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW } from "../gql/queries";
import { FaTimes, FaCheck } from "react-icons/fa";
import EditApartmentModal from "./modals/EditApartmentModal";
import { CREATE_APARTMENT, UPDATE_APARTMENT } from "../gql/mutations";
import FlexibleTable from "../components/Base/FlexibleTable";
import StyledIcon from "../components/Styled/StyledIcon";
import useCurrentTheme from "../hooks/useCurrentTheme";
import useModalSystemHelper from "../hooks/useModalSystemHelper";

const ApartmentList: React.FC = () => {
   const { pushModal, popModal } = useModalSystemHelper();
   const { refetch, data, loading, client } = useQuery(APARTMENTS_OVERVIEW, {
      variables: { orderBy: "apt_DESC" }
   });

   const extractApartmentData = useCallback(
      ({ apt, name, age, mostLonely, lonelinessMeans, firstTime, lastTime, published }) => ({
         apt,
         name,
         age,
         mostLonely,
         lonelinessMeans,
         firstTime,
         lastTime,
         published
      }),
      []
   );

   // Create Apartment
   const [createApartment, {}] = useMutation(CREATE_APARTMENT, {});
   const onCreateNewApartment = useCallback(async (id, data) => {
      const strippedData = extractApartmentData(data);
      strippedData.apt = Number.parseInt(strippedData.apt);
      await createApartment({ variables: { data: strippedData } });
      popModal();
      refetch();
   }, []);

   // Update Apartment
   const [updateApartment, {}] = useMutation(UPDATE_APARTMENT, {});
   const onUpdateApartment = useCallback(async (id, data) => {
      const strippedData = extractApartmentData(data);
      strippedData.apt = Number.parseInt(strippedData.apt);
      await updateApartment({ variables: { id, data: strippedData } });
      popModal();
      refetch();
   }, []);

   const { VARIABLES } = useCurrentTheme();

   return (
      <FlexibleTable
         loading={loading}
         header={{
            title: "Apartments",
            showAddButton: true,
            onAddButtonClicked: () =>
               pushModal(
                  <EditApartmentModal
                     apolloClient={client}
                     onFormSubmit={onCreateNewApartment}
                     modalTitle="Create Apartment"
                     buttonText="Create"
                  />
               )
         }}
         body={{
            TableHeaders: ["Published", "Apt Number", "ID"],
            TableRows:
               data &&
               data.apartments &&
               data.apartments.map(apartment => ({
                  id: apartment.id,
                  onClick: () =>
                     pushModal(
                        <EditApartmentModal
                           apolloClient={client}
                           modalTitle="Edit Apartment Details"
                           buttonText="Submit"
                           onFormSubmit={onUpdateApartment}
                           id={apartment.id}
                        />
                     ),
                  cells: [
                     apartment.published ? (
                        <StyledIcon icon={<FaCheck />} color={VARIABLES.COLORS.Green} />
                     ) : (
                        <StyledIcon icon={<FaTimes />} color={VARIABLES.COLORS.Red} />
                     ),
                     apartment.apt,
                     apartment.id
                  ]
               }))
         }}
      />
   );
};

export default ApartmentList;
