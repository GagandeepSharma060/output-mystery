// Brand configuration for Output Mystery
export const brand = {
  // Brand colors
  colors: {
    primary: '#06B6D4', // Cyan-500
    primaryDark: '#0891B2', // Cyan-600
    secondary: '#3B82F6', // Blue-500
    secondaryDark: '#2563EB', // Blue-600
    accent: '#F59E0B', // Amber-500
    success: '#10B981', // Emerald-500
    warning: '#F59E0B', // Amber-500
    error: '#EF4444', // Red-500
    
    // Background colors
    background: '#111827', // Gray-900
    surface: '#1F2937', // Gray-800
    surfaceLight: '#374151', // Gray-700
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#D1D5DB', // Gray-300
    textMuted: '#9CA3AF', // Gray-400
  },
  
  // Typography
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  
  // Brand information
  info: {
    name: 'Output Mystery',
    tagline: 'Solve coding mysteries. Master programming skills.',
    description: 'Watch bite-sized coding tutorials and practice with our interactive IDE',
    website: 'https://outputmystery.com',
    youtube: 'https://www.youtube.com/@OutputMystery',
    github: 'https://github.com/GagandeepSharma060/output-mystery',
  },
  
  // Logo configuration
  logo: {
    text: 'Output Mystery',
    icon: '🔍', // You can replace this with an actual logo
    showIcon: true,
  },
  
  // Social links
  social: {
    youtube: 'https://www.youtube.com/@OutputMystery',
    github: 'https://github.com/GagandeepSharma060/output-mystery',
    twitter: '', // Add if you have one
    linkedin: '', // Add if you have one
  },
  
  // Feature highlights
  features: [
    {
      icon: '🎥',
      title: 'Video Learning',
      description: 'Watch bite-sized coding tutorials that get straight to the point.'
    },
    {
      icon: '💻',
      title: 'Interactive IDE',
      description: 'Practice coding directly in your browser with our integrated development environment.'
    },
    {
      icon: '🏆',
      title: 'Coding Challenges',
      description: 'Test your skills with hands-on challenges that reinforce what you learn from the videos.'
    },
    {
      icon: '⚡',
      title: 'Quick Learning',
      description: 'Master programming concepts in minutes, not hours. Perfect for developers on the go.'
    },
    {
      icon: '📚',
      title: 'Categorized Content',
      description: 'Find exactly what you need with our organized categories: JavaScript, React, Python, and more.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Keep track of your learning journey and see how much you have improved over time.'
    }
  ],
  
  // Stats for hero section
  stats: [
    {
      value: '100+',
      label: 'Coding Shorts',
      description: 'Updated weekly'
    },
    {
      value: 'Interactive',
      label: 'IDE Experience',
      description: 'Practice anytime'
    },
    {
      value: 'Free',
      label: 'Learning Platform',
      description: 'Always accessible'
    }
  ]
};

// CSS custom properties for easy theming
export const brandCSS = `
  :root {
    --brand-primary: ${brand.colors.primary};
    --brand-primary-dark: ${brand.colors.primaryDark};
    --brand-secondary: ${brand.colors.secondary};
    --brand-secondary-dark: ${brand.colors.secondaryDark};
    --brand-accent: ${brand.colors.accent};
    --brand-success: ${brand.colors.success};
    --brand-warning: ${brand.colors.warning};
    --brand-error: ${brand.colors.error};
    --brand-background: ${brand.colors.background};
    --brand-surface: ${brand.colors.surface};
    --brand-surface-light: ${brand.colors.surfaceLight};
    --brand-text-primary: ${brand.colors.textPrimary};
    --brand-text-secondary: ${brand.colors.textSecondary};
    --brand-text-muted: ${brand.colors.textMuted};
  }
`;
