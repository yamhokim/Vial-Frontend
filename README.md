# Vial Frontend

A modern web application built with Next.js for managing form data and queries. This frontend application provides a user-friendly interface for viewing, creating, and managing form data entries and their associated queries. Please note that this repository only contains code for the frontend component, you'll need to clone and run the backend server for full functionality.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v22+)
- npm (v10+)
- The Vial backend service running locally

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vial-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content (or just copy contents of .env.example file):

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

The port number in the API URL should match whatever port number your backend server is hosted on.

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) by default.

## Usage

### Viewing Form Data

1. The application starts at `/form-data` by default
2. The table displays all form data entries with their associated queries
3. Use the pagination controls at the bottom to navigate through entries

### Managing Queries

1. **Create a Query**

   - Click the "Create Query" button on a form data entry
   - Fill in the title and optional description
   - Submit to create the query

2. **Update Query Status**

   - Click on an existing query to view its details
   - All queries will start off as "OPENED" but can be "RESOLVED" by pressing the resolve button

3. **Delete Query**
   - Click on a query to view its details
   - Click the "Delete Query" button at the bottom of the page

## Project Structure

```
vial-frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── form-data/         # Form data routes
│   │   └── page.tsx           # Root page (redirects to /form-data)
│   ├── components/            # Reusable components
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── package.json             # Project dependencies and scripts
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Mantine](https://mantine.dev/) - UI component library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching

## API Integration

The frontend communicates with the backend API endpoints:

- `GET /form-data` - Retrieve form data entries and associated queries
- `POST /query` - Create a new query
- `PUT /query/:id` - Update a query by id
- `DELETE /query/:id` - Delete a query by id
