# AI Powerball Generator

A personal AI-powered lottery number generator built with Next.js and OpenAI.

## Features

- **AI-Enhanced Number Generation**: Uses OpenAI GPT to generate and explain lottery numbers
- **Powerball Support**: Generate numbers for Powerball (5 numbers from 1-69 + 1 Powerball from 1-26)
- **Generation History**: View and copy your past generations (stored in localStorage)
- **Beautiful UI**: Clean, modern interface with Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 16+ installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Add your OpenAI API key**:
   - Open `dashboard/.env.local`
   - Replace `your-api-key-here` with your actual OpenAI API key:
     ```
     OPENAI_API_KEY=sk-...
     ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Navigate to http://localhost:3000
   - Click "Generate My Numbers" to create your first set!

## How It Works

1. **Random Base**: The app generates cryptographically secure random numbers
2. **AI Enhancement**: OpenAI GPT analyzes and may refine the numbers
3. **Reasoning**: AI provides creative reasoning for why the numbers are lucky
4. **History**: All generations are saved to your browser's localStorage

## Project Structure

```
dashboard/
├── components/
│   ├── AIReasoning.js       # Display AI explanation
│   ├── GenerateButton.js    # Main CTA button
│   ├── HistoryList.js       # Past generations
│   └── NumberDisplay.js     # Number balls display
├── lib/
│   ├── lottery-config.js    # Powerball rules & validation
│   └── openai.js            # OpenAI API integration
├── pages/
│   ├── api/
│   │   └── generate-numbers.js  # API endpoint
│   ├── _app.js              # App wrapper
│   └── index.js             # Main generator page
├── styles/
│   └── globals.css          # Tailwind styles
└── .env.local               # Environment variables
```

## API Usage

The app uses OpenAI's `gpt-4o-mini` model, which is cost-effective:
- ~$0.001 per generation
- Fast response times (1-2 seconds)

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI GPT-4o-mini
- **Storage**: Browser localStorage
- **Deployment**: Ready for Vercel

## Deployment

To deploy to Vercel:

1. Push this code to GitHub
2. Connect your repo to Vercel
3. Add `OPENAI_API_KEY` to Vercel environment variables
4. Deploy!

## Future Enhancements

- [ ] Add Mega Millions support
- [ ] Migrate to Supabase for cross-device history
- [ ] Add "Quick Pick 5" feature
- [ ] Number frequency analytics
- [ ] Export to PDF
- [ ] Dark mode toggle

## Notes

- This is for personal/entertainment use only
- Numbers are randomly generated with AI storytelling
- Play responsibly!

## Support

Built with Claude Code. For issues or questions, check the main project README.
