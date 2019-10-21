import React, { CSSProperties } from "react";
import "./card-grid-style.scss";

export interface CardGridProps {
   children?: Object;
   className?: string;
   style?: CSSProperties;
}

const CardGrid: React.FC = ({ children }) => {
   return <div className="pd-card-grid">{children}</div>;
};

export default CardGrid;
