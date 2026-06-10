# Undangan - Wedding Invitation

Modern wedding invitation website built with Next.js, React, Framer Motion, and Tailwind CSS.

## Features

- 🎨 Beautiful animated UI with Framer Motion
- 📱 Fully responsive design
- 💝 Wedding gift section with animated bank cards
- 📸 Animated gallery with carousel effect
- 💬 Guest wishes/messages section
- ⏰ Countdown timer to wedding day
- 🎵 Background music player
- ✨ Smooth page transitions and animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JayadiDinata/Undangan.git
cd Undangan

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This project is configured to deploy automatically to GitHub Pages on every push to the `main` branch.

### GitHub Pages Configuration

1. Go to your repository Settings
2. Navigate to "Pages" section
3. Set Source to "GitHub Actions"
4. The site will be deployed at: `https://JayadiDinata.github.io/Undangan/`

### Manual Deployment

The project uses a custom build process:
1. `next build` generates static files in the `undangan/` folder
2. `copy-out-to-root.js` script copies output files to project root
3. GitHub Actions workflow automatically deploys these files

## Project Structure

```
├── app/
│   ├── page.tsx          # Main invitation page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/
│       └── container-scroll-animation.tsx
├── public/
│   └── img/              # Wedding photos
├── scripts/
│   └── copy-out-to-root.js  # Build output script
├── next.config.mjs       # Next.js configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Customization

Update the wedding details in `app/page.tsx`:

```typescript
const couples = {
  bride: { name: 'Your Name', ... },
  groom: { name: 'Partner Name', ... },
  // ... other details
}

const events = [
  { title: 'Akad Nikah', date: '...', ... },
  // ... other events
]
```

## License

This project is open source and available under the MIT License.

## Author

Created by [JayadiDinata](https://github.com/JayadiDinata)