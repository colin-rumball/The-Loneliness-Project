import React from "react";
import Text, { TextSize } from "./Base/Text/Text";

const Avatar: React.FC = () => {
   return (
      <div className="pd-avatar">
         <img className="avatar-image" src="/static/headshot.png" />
         <Text text="Colin Rumball" size={TextSize.LARGE} />
         <Text text="Web Developer" size={TextSize.SMALL} />
      </div>
   );
};

export default Avatar;
