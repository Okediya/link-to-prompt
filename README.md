# Link to Prompt

> Paste any website URL. Get the perfect AI coding prompt to rebuild it.

A futuristic, minimalist web app that scrapes any website, analyzes its structure, and generates a single optimized prompt for AI coding agents (Cursor, v0, Claude, etc.) to rebuild it from scratch. Refine the prompt through natural-language chat with live updates.

The logo depicts a metallic robot hand and a human hand with index fingers nearly touching — a futuristic, sci-fi reinterpretation of Michelangelo's "Creation of Adam" — symbolizing the collaboration between human intent and AI execution.

---

## About

**Link to Prompt** bridges the gap between "I want a site like this" and actually building it. Instead of manually describing a website's layout, colors, fonts, and interactions, simply paste the URL and let AI do the analysis. The output is a structured, copy-ready prompt that any AI coding agent can execute immediately.

---

## Features

- **One-click website analysis** — paste a URL and generate a comprehensive coding prompt instantly
- **Jina Reader integration** — cleanly scrapes any website into structured markdown
- **Groq Llama 3.3 70B** — blazing-fast prompt generation with one of the best open models
- **Real-time chat refinement** — tweak the prompt with natural language, see changes live
- **Live prompt viewer** — the right panel updates instantly as you refine
- **One-click copy** — copy the final prompt to your clipboard
- **Futuristic minimal UI** — pure black, white, and silver design with zero clutter
- **Fully responsive** — split-panel on desktop, stacked on mobile
- **Open source** — MIT licensed, fork and contribute

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router + React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| AI SDK | Vercel AI SDK (@ai-sdk/react + @ai-sdk/groq) |
| Model | Llama 3.3 70B Versatile via Groq |
| Scraping | Jina Reader |
| Toasts | Sonner |
| Icons | Lucide (minimal use) |
| Deployment | Vercel |

---

## Screenshots

![Link to Prompt — Hero and URL Input](public/screenshots/hero.png)
*Header with the robot-human-fingers logo, URL input, and Generate button*

![Link to Prompt — Split Panel View](public/screenshots/split-view.png)
*Chat refinement on the left, live prompt viewer on the right*

---

## Quick Start

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com/keys)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/link-to-prompt.git
cd link-to-prompt

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Groq API key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key. Get one at [console.groq.com/keys](https://console.groq.com/keys) |

Create a `.env.local` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add the `GROQ_API_KEY` environment variable in the Vercel dashboard
5. Click **Deploy**

The app will be live in under a minute.

---

## Contributing

Contributions are welcome! Here is how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please keep the code clean, well-commented, and consistent with the existing style.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
