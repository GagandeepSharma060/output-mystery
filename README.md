# Output Mystery - YouTube Coding Platform

A modern, interactive platform for your YouTube coding channel that combines video tutorials with hands-on coding practice.

## 🚀 Features

### 🎥 Video Integration
- **YouTube Channel Integration**: Direct links to your YouTube channel
- **Video Categories**: Organized by programming languages and topics
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Video Modal**: Watch videos without leaving the platform
- **Responsive Video Grid**: Beautiful grid layout for video thumbnails

### 💻 Interactive IDE
- **Multi-language Support**: JavaScript, Python, CSS, React, TypeScript, Node.js
- **Code Templates**: Pre-built examples for each language
- **Real-time Code Editor**: Syntax highlighting and error detection
- **Output Panel**: See your code results instantly
- **Template Library**: Curated code examples for learning

### 🏆 Coding Challenges
- **Progress Tracking**: Track completed challenges and earn points
- **Category Filtering**: Filter by programming language and difficulty
- **Challenge System**: Hands-on exercises linked to video tutorials
- **Achievement System**: Points and completion tracking

### 🎨 Modern UI/UX
- **Dark Theme**: Professional dark mode design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging hover effects and transitions
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Fonts**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd OutputMystery/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── ide/               # IDE page
│   │   ├── videos/            # Videos page
│   │   └── challenges/        # Challenges page
│   └── components/            # React components
│       ├── Navigation.tsx     # Navigation bar
│       ├── HeroSection.tsx    # Hero section
│       ├── VideoSection.tsx   # Video grid and modal
│       ├── FeaturesSection.tsx # Features showcase
│       ├── IDE.tsx            # Interactive code editor
│       └── ChallengesSection.tsx # Challenges grid
├── public/                    # Static assets
└── package.json
```

## 🎯 Customization

### Adding Your YouTube Videos

1. **Update Video Data**: Edit the `mockVideos` array in `VideoSection.tsx`
2. **YouTube API Integration**: Replace mock data with YouTube Data API
3. **Video Categories**: Add new categories in the `categories` array
4. **Thumbnails**: Use YouTube's thumbnail API for automatic thumbnails

### Customizing the IDE

1. **Code Templates**: Add new templates in `IDE.tsx`
2. **Languages**: Add support for new programming languages
3. **Execution**: Integrate with code execution services (CodePen, Repl.it, etc.)

### Styling

1. **Colors**: Update Tailwind color scheme in `tailwind.config.js`
2. **Fonts**: Change fonts in `layout.tsx`
3. **Components**: Modify component styles in individual files

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# YouTube API (optional)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Code Execution API (optional)
CODE_EXECUTION_API_URL=your_api_url
```

### YouTube Integration

To integrate with your actual YouTube channel:

1. Get YouTube Data API key from Google Cloud Console
2. Update the video fetching logic in `VideoSection.tsx`
3. Replace mock data with real API calls

## 📱 Mobile Optimization

The platform is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Environment variables can be set in Vercel dashboard

### Other Platforms

- **Netlify**: Use `npm run build` and deploy the `out` folder
- **AWS S3**: Upload the built files to S3 bucket
- **DigitalOcean**: Use App Platform for easy deployment

## 🎨 Design System

### Colors
- **Primary**: Cyan (#06B6D4)
- **Secondary**: Blue (#3B82F6)
- **Background**: Gray-900 (#111827)
- **Surface**: Gray-800 (#1F2937)
- **Text**: White/Gray-300

### Typography
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Code**: Monospace

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Contact: [Your Contact Information]

---

**Built with ❤️ for the coding community**