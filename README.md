# ResumeCraft

A modern, ATS-friendly resume builder built with React, TypeScript, and Tailwind CSS. Create professional resumes in minutes with beautiful templates and perfect PDF export.

## Features

- 🎨 **3 Modern Templates**: Minimal, Tech-Focused, and Elegant Professional
- 📄 **ATS-Optimized**: Designed to pass Applicant Tracking Systems
- 💾 **PDF Export**: Perfect 1:1 rendering with browser-native print dialog
- ⚡ **Real-time Preview**: See changes instantly as you type
- 🎯 **Drag & Drop**: Reorder sections easily
- 📱 **Responsive Design**: Works beautifully on all devices
- 🔄 **Template Switching**: Change templates instantly without losing data

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Router** for navigation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── builder/          # Multi-step form components
│   ├── templates/        # Resume templates
│   ├── ui/               # Reusable UI components
│   ├── LandingPage.tsx   # Landing page
│   └── ResumePreview.tsx # Live preview component
├── pages/
│   └── BuilderPage.tsx   # Main builder page
├── store/
│   └── resumeStore.ts    # Zustand state management
├── styles/
│   └── resume.css        # Resume-specific styles
├── types/
│   └── resume.ts         # TypeScript types
└── utils/
    └── export.ts         # PDF export functionality
```

## Key Features

### ATS-Friendly Design
- Standard section headings
- Clean HTML structure
- Plain text formatting (no icons in print)
- ATS-safe fonts (Inter/Arial)

### Perfect PDF Export
- Fixed A4 size (210mm × 297mm)
- Point-based typography (pt units)
- No scaling or overlap issues
- Multi-page support with proper page breaks

### Templates
1. **Minimal**: Clean and simple design
2. **Tech-Focused**: Bold, technical aesthetic for developers
3. **Elegant Professional**: Sophisticated design for business roles

## License

MIT
