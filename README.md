# 🤖 AI Chatbot


A modern, interactive chatbot application built with React and Vite, featuring multiple AI assistant integrations with real-time streaming responses. <!-- test commit -->

## ✨ Features

-   💬 **Real-time Streaming**: Experience smooth, token-by-token message streaming
-   🔄 **Multiple AI Providers**: Support for OpenAI, Google AI, and DeepSeek
-   🎨 **Modern UI**: Clean and responsive interface with CSS Modules
-   ⚡ **Fast Development**: Built with Vite for blazing-fast HMR
-   📝 **Markdown Support**: Rich text formatting with react-markdown
-   🔒 **Type-safe**: ESLint configuration for code quality

## 🚀 Tech Stack

-   **Frontend**: React 19
-   **Build Tool**: Vite 7
-   **AI SDKs**:
    -   OpenAI SDK
    -   Google Generative AI
    -   DeepSeek (via OpenAI-compatible API)
-   **Styling**: CSS Modules
-   **Utilities**:
    -   react-markdown for message formatting
    -   react-textarea-autosize for input field

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/LucaMimmo05/ai-chatbot.git
    cd ai-chatbot
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

    Or with npm:

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory:

    ```bash
    cp .env.example .env
    ```

    Add your API keys:

    ```env
    VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
    VITE_OPEN_AI_API_KEY=your_openai_api_key_here
    VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
    ```

## 🎮 Usage

### Development Mode

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint Code

```bash
pnpm lint
```

## 🏗️ Project Structure

```
ai-chatbot/
├── public/              # Static assets
├── src/
│   ├── assistants/      # AI provider integrations
│   │   ├── openai.js
│   │   ├── googleai.js
│   │   └── deepseekai.js
│   ├── components/
│   │   ├── Chat/        # Main chat interface
│   │   ├── Controls/    # Input controls
│   │   └── Loader/      # Loading indicator
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── .env.example         # Environment variables template
└── vite.config.js       # Vite configuration
```

## 🔧 Configuration

### Switching AI Providers

To change the AI provider, modify the import in `src/App.jsx`:

```javascript
// For OpenAI or DeepSeek
import { Assistant } from "./assistants/openai";
// or
import { Assistant } from "./assistants/deepseekai";

// For Google AI
import { Assistant } from "./assistants/googleai";
```

> ⚠️ **Important**: When switching between OpenAI/DeepSeek and Google AI, you need to update the `chatStream` method call in `App.jsx`:

**For OpenAI/DeepSeek:**

```javascript
const result = assistant.chatStream(content, messages);
```

**For Google AI:**

```javascript
const result = assistant.chatStream(content); // No messages parameter
```

This is because Google AI maintains conversation history internally through its `startChat()` method, while OpenAI and DeepSeek require the full message history to be passed with each request.

### Customizing Models

Each assistant supports custom model selection:

-   **OpenAI**: Default is `gpt-4o-mini`
-   **Google AI**: Default is `gemini-2.5-flash`
-   **DeepSeek**: Default is `deepseek-chat`

## 🔑 Getting API Keys

-   **OpenAI**: [platform.openai.com](https://platform.openai.com/)
-   **Google AI**: [ai.google.dev](https://ai.google.dev/)
-   **DeepSeek**: [platform.deepseek.com](https://platform.deepseek.com/)

## 🚀 GitHub Actions Workflows

This project includes two automated workflows:

### CI/CD Pipeline (`ci.yml`)

Runs on every push and pull request to `main` and `develop` branches:

-   ✅ Lints code with ESLint
-   🔨 Builds the project
-   📦 Uploads build artifacts

### Deploy to GitHub Pages (`deploy.yml`)

Automatically deploys to GitHub Pages on push to `main`:

-   🔨 Builds the project with production settings
-   🌐 Deploys to GitHub Pages

### Setting up GitHub Secrets

For deployment to work, add your API keys as repository secrets:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
    - `VITE_GOOGLE_AI_API_KEY`
    - `VITE_OPEN_AI_API_KEY`
    - `VITE_DEEPSEEK_API_KEY`

### Enabling GitHub Pages

1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Save the settings

Your app will be deployed to `https://lucamimmo05.github.io/ai-chatbot/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Luca Mimmo**

-   GitHub: [@LucaMimmo05](https://github.com/LucaMimmo05)

---

Built with ❤️ using React and Vite
