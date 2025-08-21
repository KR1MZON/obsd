/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Volcanic theme colors
        primary: {
          DEFAULT: '#ff4500', // Deep orange
          dark: '#cc3700',    // Darker orange
        },
        secondary: '#ff7e00',   // Bright orange
        accent: '#ff9500',      // Ember glow
        dark: '#1a0500',        // Obsidian black with hint of red
        magma: '#8b0000',       // Deep magma red
        
        // Keep some standard colors for text/backgrounds
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'volcanic-gradient': 'linear-gradient(to bottom, #1a0500, #8b0000)',
        'magma-gradient': 'linear-gradient(135deg, #8b0000, #ff4500)',
        'ember-gradient': 'linear-gradient(45deg, #ff4500, #ff7e00)',
      },
      boxShadow: {
        'volcanic': '0 10px 40px rgba(255, 69, 0, 0.3)',
        'ember': '0 4px 20px rgba(255, 149, 0, 0.4)',
      },
      animation: {
        'pulse-ember': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}