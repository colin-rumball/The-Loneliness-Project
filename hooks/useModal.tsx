import Swal, { SweetAlertOptions, SweetAlertCustomClass } from "sweetalert2";
import styled from "styled-components";
import withReactContent from "sweetalert2-react-content";
import { useCallback } from "react";
import { FaWindowClose } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { ThemeProvider } from "styled-components";
import MainTheme from "../styles/themes/MainTheme";

const ModalManager = withReactContent(Swal);

export interface ModalOptions extends SweetAlertOptions {
   type?: "success" | "error" | "warning" | "info" | "question";
   title?: string | Object;
   html: string | Object;
   footer?: string | Object;
   width?: string;
   padding?: string;
   background?: string;
   position?:
      | "top"
      | "top-start"
      | "top-end"
      | "top-left"
      | "top-right"
      | "center"
      | "center-start"
      | "center-end"
      | "center-left"
      | "center-right"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "bottom-left"
      | "bottom-right";
   grow?: "row" | "column" | "fullscreen" | false;
   backdrop?: boolean | string;
   toast?: boolean;
   preConfirm?();
   onBeforeOpen?();
   onOpen?();
   onClose?();
   onAfterClose?();
   showCloseButton?: boolean;
   showConfirmButton?: boolean;
   showCancelButton?: boolean;
   confirmButtonText?: string;
   cancelButtonText?: string;
   confirmButtonClass?: string;
   cancelButtonClass?: string;
   allowOutsideClick?: boolean;
   allowEscapeKey?: boolean;
   allowEnterKey?: boolean;
   animation?: boolean;
   customClass?: string | SweetAlertCustomClass;
   customContainerClass?: string;
}

const StyledModalCloseButton = styled.div`
   color: ${({ theme }) => theme.LightGrey};
   font-size: 20px;
   position: absolute;
   top: 9px;
   right: 16px;
   opacity: 0.9;
   transition: opacity 0.3s ease, transform 0.3s ease;

   &:hover {
      cursor: pointer;
      transform: scale(1.1);
      opacity: 1;
      color: #fff;
   }
`;

const defaultPushModalProps: SweetAlertOptions = {
   type: null,
   title: null,
   html: null,
   footer: null,
   width: null,
   padding: null,
   background: "#FFF",
   position: "center",
   grow: false,
   backdrop: true,
   toast: false,
   preConfirm: () => {},
   onBeforeOpen: () => {},
   onOpen: () => {},
   onClose: () => {},
   onAfterClose: () => {},
   showCloseButton: true,
   closeButtonHtml: ReactDOMServer.renderToStaticMarkup(
      <StyledModalCloseButton>
         <FaWindowClose />
      </StyledModalCloseButton>
   ),
   showConfirmButton: false,
   showCancelButton: false,
   confirmButtonText: "OK",
   cancelButtonText: "Cancel",
   confirmButtonClass: "",
   cancelButtonClass: "",
   allowOutsideClick: true,
   allowEscapeKey: true,
   allowEnterKey: true,
   animation: true,
   customClass: "",
   customContainerClass: ""
};

const useModal = () => {
   const pushModal = useCallback((options: ModalOptions) => {
      const modalOptions: SweetAlertOptions = {
         ...defaultPushModalProps,
         ...options
      };

      if (modalOptions.html !== null) {
         modalOptions.html = <ThemeProvider theme={MainTheme}>{modalOptions.html}</ThemeProvider>;
      }

      if (!ModalManager.isVisible()) {
         ModalManager.queue([modalOptions]);
      } else {
         ModalManager.insertQueueStep(modalOptions);
      }
   }, []);

   const closeTopModal = useCallback(() => {
      ModalManager.close();
   }, []);

   return {
      pushModal,
      closeTopModal
   };
};

export default useModal;
