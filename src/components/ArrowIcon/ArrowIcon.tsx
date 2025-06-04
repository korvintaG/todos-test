import React from "react";

interface FolderSlaveProps extends React.SVGProps<SVGSVGElement> {
  // Дополнительные пропсы, если нужно
  customProp?: string;
}

//
export const ArrowIcon: React.FC<FolderSlaveProps> = ({
  customProp,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 199.404 199.404"
    stroke="currentColor"
    fill="currentColor"
    preserveAspectRatio="none"
    {...props}
  >
    <g>
      <polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695 " />
    </g>
  </svg>
);

export default ArrowIcon;
