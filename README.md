# Fullstack TypeScript Boilerplate

A comprehensive fullstack boilerplate project using TypeScript, TurboRepo, Vite for the frontend, and a Node.js backend. This project aims to provide a scalable and maintainable structure for modern web applications.

## Folder Structure

```
fullstack-typescript-boilerplate/
├── apps/
│ ├── frontend/
│ └── backend/
├── packages/
│ └── schema/
```

- **apps/frontend**: Contains the React application using Vite.
- **apps/backend**: Contains the Node.js backend application.
- **packages/schema**: Contains all Zod validation logic shared between frontend and backend.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fullstack-typescript-boilerplate.git
   cd fullstack-typescript-boilerplate
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To start the development servers for both frontend and backend:

```bash
pnpm dev
```

This command will run both the frontend and backend in development mode with hot-reloading.

## Building

To build both the frontend and backend applications:

```bash
pnpm build
```

### pnpm-workspace.yaml

The workspace configuration:

```bash
packages:
  - "apps/*"
  - "packages/*"
```

### Contributing

Contributions are welcome! Please create an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details
