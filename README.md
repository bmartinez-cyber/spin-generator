# 🔥 Spin Playlist Generator

An AI-powered web app for spin instructors to create fire hip-hop playlists with intelligent BPM progression.

## Features

✨ **Artist-Based Playlist Generation** - Input any artist and get a curated playlist of their top songs
🎵 **Intelligent BPM Progression** - Automatically increases BPM by ~10 per song for natural intensity flow
⚡ **Energy Level Classification** - Songs tagged as warm-up, building, peak, or cool-down
🔗 **SoundCloud Integration** - Click any song to find it on SoundCloud
💾 **Save & Share** - Save your favorite playlists and copy them to share with other instructors

## Setup Instructions

### 1. Prerequisites

- Node.js 16+ installed
- Anthropic API key (get free at https://console.anthropic.com)
- GitHub account (for deployment)
- Vercel account (for hosting)

### 2. Installation

1. Extract this folder
2. Open terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### 3. Configure API Key

1. Go to https://console.anthropic.com
2. Create a new API key
3. Open `.env.local` file
4. Replace `your_new_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
   ```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser!

### 5. Deploy to Vercel

**Option A: Using GitHub (Recommended)**

1. Create a GitHub repository named `spin-playlist-generator`
2. Push all files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/spin-playlist-generator.git
   git push -u origin main
   ```
3. Go to https://vercel.com/new
4. Import your GitHub repository
5. Add environment variable:
   - Name: `NEXT_PUBLIC_ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
6. Click "Deploy"

**Option B: Direct Deployment**

1. Go to https://vercel.com/new
2. Click "Deploy" (without Git repository)
3. Upload project files
4. Add environment variable (see above)
5. Deploy!

## How to Use

1. **Enter Artist Name** - Type any hip-hop artist (Drake, Pitbull, Travis Scott, etc.)
2. **Enter Theme Name** - Create a theme for your class (e.g., "Drake Takeover", "Pitbull Party")
3. **Set Starting BPM** - Pick the warm-up BPM (usually 85-95)
4. **Choose Playlist Length** - Select how many songs (8-15 recommended)
5. **Generate** - Click the button and watch the magic happen!
6. **Find Songs** - Click any song to search for it on SoundCloud
7. **Save & Share** - Save playlists for later or copy to share with other instructors

## Project Structure

```
spin-playlist-generator/
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js (main app)
│   └── api/
│       └── generate-playlist.js (Claude API)
├── styles/
│   └── globals.css
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local
└── .gitignore
```

## Technologies

- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Anthropic Claude API** - AI playlist generation
- **Vercel** - Hosting

## Notes

- Songs are generated using AI - double-check BPMs and availability
- Always verify songs exist on SoundCloud before class
- BPM progression is approximate - adjust manually as needed
- Save your favorite playlists for future use

## Support

Questions? Issues? Need help deploying? Make sure:
1. API key is correctly set in `.env.local`
2. You're using a recent Node.js version
3. All dependencies installed (`npm install`)
4. You're connected to the internet for API calls

---

Built with 🔥 for spin instructors who want fire playlists!
