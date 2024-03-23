import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";

export const Route = createRootRoute({
  component: () => (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  ),
});
