# Angular Architecture Patterns

This repository shows how to decouple modules in angular project.

This project was generated using [Nx](https://nx.dev).

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Tags & versions

You can switch to different versions using git tags.

Run `git checkout v1.0.0` to switch to base version with modules dependent on each other.

Run `git checkout v1.1.0` to switch to decoupled modules version.

Run `git checkout v1.2.0` to switch to decoupled modules using interfaces version.

Run `git checkout v1.3.0` to switch to extensible decoupled modules version.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@angular-architecture-patterns/mylib`.
