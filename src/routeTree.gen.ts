/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as Simple2Import } from './routes/simple2'
import { Route as SimpleImport } from './routes/simple'
import { Route as NestedFieldControllerImport } from './routes/nested-field-controller'
import { Route as NestedFieldImport } from './routes/nested-field'
import { Route as DynamicField2Import } from './routes/dynamic-field2'
import { Route as DynamicFieldImport } from './routes/dynamic-field'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const Simple2Route = Simple2Import.update({
  path: '/simple2',
  getParentRoute: () => rootRoute,
} as any)

const SimpleRoute = SimpleImport.update({
  path: '/simple',
  getParentRoute: () => rootRoute,
} as any)

const NestedFieldControllerRoute = NestedFieldControllerImport.update({
  path: '/nested-field-controller',
  getParentRoute: () => rootRoute,
} as any)

const NestedFieldRoute = NestedFieldImport.update({
  path: '/nested-field',
  getParentRoute: () => rootRoute,
} as any)

const DynamicField2Route = DynamicField2Import.update({
  path: '/dynamic-field2',
  getParentRoute: () => rootRoute,
} as any)

const DynamicFieldRoute = DynamicFieldImport.update({
  path: '/dynamic-field',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dynamic-field': {
      preLoaderRoute: typeof DynamicFieldImport
      parentRoute: typeof rootRoute
    }
    '/dynamic-field2': {
      preLoaderRoute: typeof DynamicField2Import
      parentRoute: typeof rootRoute
    }
    '/nested-field': {
      preLoaderRoute: typeof NestedFieldImport
      parentRoute: typeof rootRoute
    }
    '/nested-field-controller': {
      preLoaderRoute: typeof NestedFieldControllerImport
      parentRoute: typeof rootRoute
    }
    '/simple': {
      preLoaderRoute: typeof SimpleImport
      parentRoute: typeof rootRoute
    }
    '/simple2': {
      preLoaderRoute: typeof Simple2Import
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DynamicFieldRoute,
  DynamicField2Route,
  NestedFieldRoute,
  NestedFieldControllerRoute,
  SimpleRoute,
  Simple2Route,
])

/* prettier-ignore-end */
