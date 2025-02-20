# AO3 Chrome Extension Documentation

## Overview

AO3 Assist is a Chrome extension designed to enhance your Archive of Our Own (AO3) reading experience. It provides personalized reading recommendations based on your reading history and allows you to take and organize notes while reading fanfiction.

## Features

### 1. Personalized Recommendations
- Fetches tailored reading recommendations based on your AO3 reading history
- Organizes recommendations by categories
- Provides direct links to recommended works

### 2. Note-Taking System
- Create, edit, and delete notes for fanfiction works
- Organize notes with custom tags
- Color-code notes for better organization
- Filter notes by tags
- Sort notes by date or alphabetically
- Mark notes as completed
- Persistent storage using browser's localStorage

### 3. User Interface
- Clean, modern interface with smooth animations
- Responsive design that works well within the Chrome extension popup
- Intuitive navigation between recommendations and notes
- Quick access to AO3 website

## Component Structure

### Footer Component
```typescript
interface FooterProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  onOpenClick: () => void;
}
```

# AO3 Chrome Extension Documentation

## Overview

AO3 Assist is a Chrome extension designed to enhance your Archive of Our Own (AO3) reading experience. It provides personalized reading recommendations based on your reading history and allows you to take and organize notes while reading fanfiction.

## Features

### 1. Personalized Recommendations
- Fetches tailored reading recommendations based on your AO3 reading history
- Organizes recommendations by categories
- Provides direct links to recommended works

### 2. Note-Taking System
- Create, edit, and delete notes for fanfiction works
- Organize notes with custom tags
- Color-code notes for better organization
- Filter notes by tags
- Sort notes by date or alphabetically
- Mark notes as completed
- Persistent storage using browser's localStorage

### 3. User Interface
- Clean, modern interface with smooth animations
- Responsive design that works well within the Chrome extension popup
- Intuitive navigation between recommendations and notes
- Quick access to AO3 website

## Component Structure

### Footer Component
```typescript
interface FooterProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  onOpenClick: () => void;
}
```

The Footer component provides navigation between different sections of the extension and quick access to AO3.

### Popup Component

Handles:

- Initial user authentication
- Welcome screen
- Token management
- Navigation to main features


### Recommendations Component

Features:

- Fetches recommendations from API
- Displays categorized recommendations
- Loading states with animations
- Error handling


### Notes Component

Capabilities:

- Note creation with title, content, and tags
- Color selection for notes
- Tag management system
- Filtering and sorting options
- Completion status tracking


## Installation

1. Clone the repository
2. Install dependencies:


```shellscript
npm install
```

3. Build the extension:


```shellscript
npm run build
```

4. Load the extension in Chrome:

1. Open Chrome Extensions (chrome://extensions/)
2. Enable Developer Mode
3. Click "Load unpacked"
4. Select the built extension directory





## Usage

1. Click the extension icon in Chrome to open the popup
2. First-time users will see a welcome screen
3. Click "Get Started" to authenticate
4. Navigate between recommendations and notes using the footer tabs
5. Use the center button to quickly access AO3


## API Integration

The extension integrates with a recommendations API:

- Endpoint: `https://ao3-aiml.onrender.com/recommendations/{username}`
- Authentication: Requires valid access and refresh tokens
- Response: JSON object with categorized recommendation links


## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## Development

### Environment Setup

Required environment variables:

- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_AUTH_URL`: Authentication service URL


### Styling Guidelines

- Uses inline styles with consistent color scheme
- Primary color: `#285599`
- Background color: `#F3F5F7`
- Font family: Arial, sans-serif (with fallbacks)


### State Management

- Uses React hooks for local state management
- localStorage for persistent data storage
- Token management through Chrome extension storage


## License

This project is licensed under the MIT License - see the LICENSE file for details.