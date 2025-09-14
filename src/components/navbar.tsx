"use client";
import React from "react";
import Image from "next/image";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PhoneIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  {
    name: "About",
    icon: InformationCircleIcon,
    href: "#about",
  },
  {
    name: "Services", 
    icon: Cog6ToothIcon,
    href: "#services",
  },
  {
    name: "Contact",
    icon: PhoneIcon,
    href: "#contact",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <li>
      {/* @ts-ignore */}
      <Typography
        as="a"
        href={href || "#"}
        onClick={handleClick}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto container">
        {/* @ts-ignore */}
        <MTNavbar
          blurred
          color="white"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6"
        >
          <div className="flex items-center justify-between">
            {/* @ts-ignore */}
            <div className="flex items-center">
  <Image
    src="/image/studioai.png"
    alt="Studio AI Logo"
    width={50}
    height={50}
    className="h-12 w-auto"
  />
</div>
            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              {/* @ts-ignore */}
              <Button 
                variant="text"
                onClick={() => alert('Login functionality not implemented yet')}
              >
                Log in
              </Button>
              {/* @ts-ignore */}
              <Button 
                color="gray"
                onClick={scrollToContact}
              >
                Get Started
              </Button>
            </div>
           {/* @ts-ignore */}
            <IconButton
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-4 flex items-center gap-4">
                {/* @ts-ignore */}
                <Button 
                  variant="text"
                  onClick={() => alert('Login functionality not implemented yet')}
                >
                  Log in
                </Button>
                {/* @ts-ignore */}
                <Button 
                  color="gray"
                  onClick={scrollToContact}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;