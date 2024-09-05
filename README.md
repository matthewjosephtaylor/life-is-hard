# AI UI

This project is a complete front-end project for a SPA (Single Page Application) that uses the AI-Workforce backend API.

It is originally designed as the full front-end to AI-Workforce.  

It is expected to be used as a reference or starting point for others wanting to build their own projects using AI-Workforce as the backend for AI-related services such as text-generation, image-generation, text-to-speech (TTS), automated-speech-recognition (ASR), document-storage/RAG, etc...

In order to make it easier for others to build their own front-ends for their own web applications, this project is designed to be easily customizable and extensible.

In particular there is a concept of an 'App Front' that acts as main entry point for rendering React Components. This is essentially a customizable entrypoint for where to start rendering the React components.

The 'App Front' approach allows users of this project to _immediately_ have a working application that can be customized to their needs.

By open sourcing the front-end we hope to encourage others to build their own front-ends and contribute to the AI-Workforce project.

This approach allows us to rapidly evolve and improve these complex user interfaces, and prevents users from having to start from a 'blank slate'.


## Requirements

- [Node.js](https://nodejs.org) 
- [Bun](https://bun.sh) (optional but recommended for package management)


## Getting Started
The current preference and examples use bun but npm and other package managers can be used.

### Installation:

1. Install the dependencies
```bash
bun install
```

2. Start the development server
```bash
bun start
```

3. Open the browser and navigate to `http://localhost:6129`


## Scripts
- `bun start`: Start the development server
- `bun build`: Build the project for production

There are several other scripts in the package.json. Most of these are for deploying this project as the front-end of the AI-Workforce project. Feel free to use them as an example if you wish to deploy to your own server. We use Cloudflare Pages for our deployments, but the build is a static site and can be deployed to any static site host.


## Further Documentation
For more information on how to use this project, please refer to the online project documention [documentation](docs/README.md).


## Contributing

We welcome contributions to this project. Please submit a pull request with your changes. We will review and merge them as soon as possible.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.