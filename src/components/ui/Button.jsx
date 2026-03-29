import React from "react";

export default function Button({
  eventClick = () => {},
  title = "Button",
  iconLeft,
  iconRight,
  size = "md",
  variant = "default",
  href = "#",
}) {
  const sizesStyle = {
    sm: "text-sm px-4 py-1",
    md: "text-md px-4 py-2",
    lg: "text-lg px-4 py-2",
  };
  const variantStyle = {
    default: "border-2 border-gray-300",
    link: "border-0",
  };
  if (variant === "link") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-row justify-center items-center  text-black gap-2 rounded-full ${variantStyle[variant]} hover:border-newblue hover:text-newblue  transition duration-300 ease-in-out cursor-pointer ${sizesStyle[size]}`}
        onClick={eventClick}
      >
        {iconLeft && iconLeft}
        {title}
        {iconRight && iconRight}
      </a>
    );
  } else {
    return (
      <button
        className={`flex flex-row justify-center items-center  text-black gap-2 rounded-full ${variantStyle[variant]} hover:border-newblue hover:text-newblue  transition duration-300 ease-in-out cursor-pointer ${sizesStyle[size]}`}
        onClick={eventClick}
      >
        {iconLeft && iconLeft}
        {title}
        {iconRight && iconRight}
      </button>
    );
  }
}
