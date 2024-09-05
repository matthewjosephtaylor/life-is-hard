# AI Workers Arch


- Cloudflare at core
  - Workers (serverless)
  - Durable Objects (state management)
  - D1 (database)
  - R2 (blobs like images)
  - Tunnels
    - how we connect to Docker services
  - Pages for UI hosting


- Docker for heavy services that need a 'real server'
  - all connected via CF tunnels
  - TTS inference
    - TTS python module is main big library
    - coqui/XTTSv2 is the model (non-commercial OS) (coqui now defunct company as of about a month or so back)
  - LLM inference
    - Mixtral MoE, etc.. (Open model)
    - Using oobabooga/web-ui 
      - mostly for dev convenience but the OpenAI-like API seems stable enough so also perhaps more long-term
  - Vector DB
    - Postgresql (OSS) pg_vector
    - BGE v1.5 embed model (Open model)
  - Text-extract
    - Tika (OSS)
  - Web Crawl
    - Playwrite (OSS)

- Serverless Worker (backend)

## Backend (Serverless)
### Serverless Worker Deps
```
    "@casl/ability": "^6.5.0",
    "@cloudflare/ai": "^1.0.48", (experimentation)
    "@mjtdev/engine": "file:../../mjtdev-engine",
    "@tsndr/cloudflare-worker-jwt": "^2.3.2", (JWT production)
    "ai-worker-common": "file:../ai-worker-common" (typedefs and stuff shared between front and back ends)


```
Backend LOC (just look at TypeScript)
```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      92          35762          51560        1089899
TypeScript                     289           1262           1193          10239
JSON                             5              8              0           4877
Text                             4              0              0            113
TOML                             1             16             44             45
SQL                              1              7              0             18
Bourne Shell                     1              4              5              7
Markdown                         1              1              0              6
-------------------------------------------------------------------------------
SUM:                           394          37060          52802        1105204
-------------------------------------------------------------------------------
```

## Common
### Common code (shared between front and back)
- no 3rd party code other than MJT engine
- mostly type definitions and common code for entity objects/messages/events, etc. where high coordination between front/back is critical

Common LOC (just look at TypeScript)
```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     154            319            635           2298
JSON                             4              8              0            453
Markdown                         1              2              0              3
-------------------------------------------------------------------------------
SUM:                           159            329            635           2754
-------------------------------------------------------------------------------
```

## UI / Frontend
- UI (frontend)
  - React
    - transitioning to Radix for UI components
    - Minor non-mjt-engine dependencies

UI LOC (Just look at TypeScript)
```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     439           1221           2398          13794
JSON                             4              7              0           5227
Markdown                         2             17              0            138
CSS                              1             16              3             96
JavaScript                       2              0              1             16
Bourne Shell                     1              8             26             12
Text                             1              2              0             12
HTML                             1              0              0              8
-------------------------------------------------------------------------------
SUM:                           451           1271           2428          19303
-------------------------------------------------------------------------------
```

### UI Deps
```
    "@lunapaint/png-codec": "^0.2.0", (png parsing)
    "@mjtdev/engine": "file:../../mjtdev-engine",
    "@preact/signals": "^1.2.2", (state managment experiment)
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/themes": "^2.0.3",
    "ai-worker-common": "file:../ai-worker-common", (shared code between front and back ends)
    "character-card-utils": "^2.0.3", (character card format)
    "easing-utils": "^1.0.0", (UI ianimations)
    "http-status-codes": "^2.3.0", (boilerplate)
    "immer": "^10.0.3", (immutable state)
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-window": "^1.8.10"
```

### MJT Engine

MJT's codebase of useful stuff he has developed over the years:

Current sub-packages within mjtdev-engine (Ignore the byte size, most of that is likely node_modules stuff and symlink artifacts)
```
1.8M    mjtdev-ai
 64M    mjtdev-animate
 64M    mjtdev-assert
 67M    mjtdev-babs
 64M    mjtdev-browser-file
 65M    mjtdev-byte
 64M    mjtdev-cache
472K    mjtdev-color
 64M    mjtdev-grid
 64M    mjtdev-html
 64M    mjtdev-idb
284K    mjtdev-image
 64M    mjtdev-input
 66M    mjtdev-magica-voxels
2.7M    mjtdev-math
 64M    mjtdev-nlp
 64M    mjtdev-noise
1.2M    mjtdev-object
264K    mjtdev-parse
 65M    mjtdev-physics
 64M    mjtdev-random
 66M    mjtdev-reacts
 64M    mjtdev-stat
 64M    mjtdev-string
```

### lines of code in MJT Engine (TypesScript is the one to look at as the JavaScript is generated from that)
- 847 files, with 70k LOC of TypeScript
- I expect most of that code isn't being using for AI workforce, but gives a general scale of the engine overall
- Only true OS (Apache/MIT, etc) used as deps in MJT engine
```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      23            109         119747         839663
TypeScript                     847           5697          50658          71911
JSON                            75              8              0          38849
Text                             2             59              0            189
Markdown                        26             78              2            162
Bourne Shell                     1              4              0              6
-------------------------------------------------------------------------------
SUM:                           974           5955         170407         950780
-------------------------------------------------------------------------------
```