# Fullstack TypeScript Boilerplate

## Overview

This project is a boilerplate for building fullstack applications using TypeScript. It leverages npm workspaces to manage dependencies across multiple packages and applications within the repository.

## Project Structure

The project is organized into the following directories:

```
fullstack/
├── apps/
│ ├── backend/
│ └── frontend/
└── packages/
└── schema/
```

- **apps**: Contains the applications (`backend` and `frontend`).
  - **backend**: A TypeScript Node.js application.
  - **frontend**: A React or Next.js application.
- **packages**: Contains shared packages used by both the frontend and backend.
  - **schema**: Includes all common types and schema validations used across the project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (v7 or higher recommended)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/mdpabel/Fullstack-typescript-boilerplate
cd fullstack-typescript-boilerplate
```

2. Install the dependencies:

```sh
npm install
```

## Running the Applications

### Backend

Navigate to the backend directory and start the server:

```sh
cd apps/backend
npm run dev
```

### Frontend

Navigate to the frontend directory and start the development server:

```sh
cd apps/frontend
npm run dev
```

### Using the Shared Package

The schema package is used to define shared types and schema validations. It can be imported in both the frontend and backend applications as follows:

```ts
import { YourSchema } from '@packages/schema';
```

### Workspace Configuration

The package.json file in the root of the project is configured to use npm workspaces:

```json
{
  "name": "fullstack",
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

### Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

### License

This project is licensed under the MIT License.
