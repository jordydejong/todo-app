# Todo App - Next.js Frontend

A modern, responsive todo management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📝 **Todo Management**: Create, read, update, and delete todos
- 🏷️ **Status Tracking**: Track todos as TODO, IN_PROGRESS, or DONE
- 👥 **Assignment**: Assign todos to team members
- 📅 **Due Dates**: Set and track due dates for todos
- 🎨 **Modern UI**: Clean, responsive interface with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js 15 and React 19

## Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks
- **API Integration**: Fetch API with custom client

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on port 5069 (or configured port)

## Installation

1. Clone the repository and navigate to the app directory:
```bash
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5069/api
```

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Docker

### Using Docker Compose (Recommended)

From the parent directory:
```bash
docker-compose up todo-app
```

### Building Docker Image Standalone

```bash
docker build -t todo-app .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api:8080 todo-app
```

## Project Structure

```
todo-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with todo list
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── todos/
│       └── [id]/
│           └── page.tsx   # Todo detail page
├── components/            # React components
│   ├── TodoList.tsx      # Todo list container
│   ├── TodoItem.tsx      # Individual todo item
│   ├── TodoDetails.tsx   # Todo detail view
│   └── AddTodo.tsx       # Add todo form
├── lib/                   # Utilities and API
│   ├── api.ts            # API client
│   ├── config.ts         # Configuration
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## API Endpoints

The app expects these API endpoints:

- `GET /todos` - List all todos
- `GET /todos/:id` - Get todo by ID
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

### Todo Data Structure

```typescript
interface Todo {
  id: number | string;
  name: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  date: string;           // Due date (YYYY-MM-DD)
  assignee: string;
  creator: string;
}
```

## Features in Detail

### Creating Todos
- Click the expand arrow for additional fields
- Name is required, description and assignee are optional
- Todos are created with TODO status by default

### Managing Status
- Click checkbox to toggle between TODO and DONE
- Use the detail view to set IN_PROGRESS status
- Status badges show current state with color coding

### Todo Details
- Click on any todo to view full details
- Edit mode allows updating all fields
- Delete todos from list or detail view

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

## Troubleshooting

### CORS Errors
Ensure the backend API has CORS configured to allow requests from `http://localhost:3000` (or your production domain).

### API Connection Issues
1. Check that the API is running
2. Verify the `NEXT_PUBLIC_API_URL` is correct
3. Check browser console for detailed error messages

### Date Formatting
The app expects dates in `YYYY-MM-DD` format from the API and displays them in a localized format.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Todo application suite.