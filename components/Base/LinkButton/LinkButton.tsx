import Link, { LinkProps } from "next/link";
import React from "react";
import Button, { ButtonProps } from "../Button/Button";

interface LinkButtonProps extends ButtonProps, LinkProps {}

const LinkButton = (props: LinkButtonProps) => {
   // Manually pull out the props for the link. It's not the best but interfaces aren't available at runtime...
   const { href, as, replace, scroll, shallow, passHref, prefetch, ...rest } = props;
   return (
      <Link
         href={href}
         as={as}
         replace={replace}
         scroll={scroll}
         shallow={shallow}
         passHref={passHref}
         prefetch={prefetch}
      >
         <Button {...rest} />
      </Link>
   );
};

export default LinkButton;
