import ModalBase, { ModalBaseProps } from "../containers/modals/ModalBase";

function withModalBase<T extends ModalBaseProps>(Modal: React.FC) {
   return (props: T) => (
      <ModalBase {...props}>
         <Modal {...props} />
      </ModalBase>
   );
}

export default withModalBase;
