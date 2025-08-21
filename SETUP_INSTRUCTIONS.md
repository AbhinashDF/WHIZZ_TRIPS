# WHIZZ TRAVELS - VS Code Setup Instructions

## Prerequisites

Before setting up the project in VS Code, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

## Setup Steps

### 1. Clone/Download the Project
```bash
# If using git
git clone <your-repository-url>
cd whizz-travels

# Or simply download and extract the project files
```

### 2. Open in VS Code
```bash
code .
```

### 3. Install Recommended Extensions
When you open the project in VS Code, you'll see a popup asking to install recommended extensions. Click **"Install All"** or manually install these essential extensions:

- **Tailwind CSS IntelliSense** - CSS class autocomplete
- **Prettier** - Code formatter
- **TypeScript** - Enhanced TypeScript support
- **ESLint** - Code linting
- **Auto Rename Tag** - HTML/JSX tag renaming
- **Path Intellisense** - File path autocomplete

### 4. Install Project Dependencies
Open the integrated terminal in VS Code (`Ctrl+`` ` or `View > Terminal`) and run:

```bash
npm install
```

This will install all the required dependencies listed in `package.json`.

### 5. Environment Setup (Optional)
If you plan to use Stripe payments, create a `.env` file in the root directory:

```bash
# .env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

### 6. Start Development Server
Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## VS Code Features Configured

### Quick Tasks
Use `Ctrl+Shift+P` and type "Tasks: Run Task" to access:
- **Install Dependencies** - Runs `npm install`
- **Start Development Server** - Runs `npm run dev`
- **Build Project** - Runs `npm run build`
- **Type Check** - Runs TypeScript type checking

### Keyboard Shortcuts
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+`` ` - Toggle Terminal
- `F5` - Start debugging
- `Ctrl+F5` - Start without debugging

### Auto-formatting
- Files will auto-format on save using Prettier
- TypeScript imports will be organized automatically
- ESLint will highlight code issues

## Project Structure

```
whizz-travels/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and helpers
│   └── index.html
├── server/
│   ├── index.ts          # Express server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
├── shared/
│   └── schema.ts         # Shared TypeScript types
├── .vscode/              # VS Code configuration
├── package.json          # Dependencies and scripts
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `server/index.ts` or kill the process using port 5000
2. **Module not found**: Run `npm install` to ensure all dependencies are installed
3. **TypeScript errors**: Run `npm run check` to see detailed type errors

### VS Code Specific Issues

1. **Extensions not working**: Reload VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")
2. **Intellisense not working**: Restart TypeScript server (`Ctrl+Shift+P` → "TypeScript: Restart TS Server")
3. **Tailwind classes not showing**: Ensure Tailwind CSS IntelliSense extension is installed and enabled

## Database Setup (Optional)

The project uses in-memory storage by default. For database setup:

1. Set up a PostgreSQL database (local or cloud)
2. Update connection details in `server/storage.ts`
3. Run `npm run db:push` to create tables

## Support

If you encounter any issues, check:
1. Node.js version compatibility (18+)
2. All dependencies installed (`npm install`)
3. VS Code extensions installed
4. No port conflicts

For additional help, refer to the project documentation or contact the development team.