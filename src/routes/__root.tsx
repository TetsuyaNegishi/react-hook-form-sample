import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  ),
});
