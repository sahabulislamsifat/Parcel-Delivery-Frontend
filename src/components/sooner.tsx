/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/hooks/useTheme";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={
        {
          className:
            "border text-sm font-medium shadow-md transition-all duration-300",
          success: {
            className: "bg-green-500 text-white rounded-none border-green-600",
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
          error: {
            className: "bg-red-500 text-white border-red-600 rounded-none",
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
        } as any
      }
      {...props}
    />
  );
};

export { Toaster };
