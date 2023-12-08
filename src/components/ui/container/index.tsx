import React from "react";

const Container = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`fixed bg-neutral-950 p-2 m-2 border border-neutral-700 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
