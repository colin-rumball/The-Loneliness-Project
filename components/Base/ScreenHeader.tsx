import classNames from "classnames";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export enum HeaderBackground {
   DEFAULT,
   PURPLE
}

export interface ScreenHeaderProps {
   children?: Object;
   background?: HeaderBackground;
   genericBackIcon?: boolean;
   icon?: Object;
   actions?: Object;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
   const router = useRouter();
   const { children, genericBackIcon, ...rest } = props;

   const backgroundClassName = classNames("background", {
      purple: props.background == HeaderBackground.PURPLE
   });

   return (
      <div className="pd-screen-header">
         {/* BACKGROUND */}
         <div className={backgroundClassName} />
         {/* BACK ICON */}
         {genericBackIcon && (
            <span className="back-button" onClick={() => router.back()}>
               <FaArrowLeft />
            </span>
         )}
         {/* CONTENT */}
         <div className="content">{children}</div>
      </div>
   );
};

export default ScreenHeader;
