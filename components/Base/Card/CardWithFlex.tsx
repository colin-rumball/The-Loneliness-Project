import Card, { CardProps } from "./Card";
import { FlexProps, withFlex } from "../../../helpers/withFlex";

export interface CardPropsWithFlex extends CardProps, FlexProps {}

export default withFlex<CardPropsWithFlex>(Card);
