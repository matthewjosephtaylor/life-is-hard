import { fetchBackend } from "../backend/user/getBackendUser";
import { Returns } from "../state/data-object/Returns";
import { AppMessagesState } from "../state/ws/AppMessagesState";

export const play = async (params?: unknown) => {
  try {
    await playGcp();
  } catch (error) {
    console.error(error);
  }
};

export const playGcp = async () => {
  const bytes = await (await fetch("test/audio.wav")).arrayBuffer();
  console.log("bytes", bytes);
  const returnId = Returns.addReturnListener({
    onReturn: (data) => {
      console.log(data);
    },
  });
  AppMessagesState.dispatch({
    type: "play",
    detail: { returnId, data: bytes },
  });

  // const resp = await fetchBackend("/play");
  // console.log(resp);
  // const text = await resp?.text();
  // console.log(text);
  // const json = JSON.parse(text!);
  // console.log(JSON.stringify(json, undefined, 2));
};

// export const playOrTimeout = async () => {
//   const foo = await orTimeout(1000, async () => {
//     await waitTimeout(10);
//     return true;
//   });
//   console.log("foo", foo);
// };

// export const playGateDownload = async () => {
//   const base = "http://localhost:9010";
//   const authToken = "test-123";

//   const req: CmdRequestBody = {
//     command: "ps",
//   };

//   // const resp = await Fetches.fetchWithAuth({ url: `${base}/ps`, authToken });
//   const resp = await Fetches.fetchWithAuth({
//     url: `${base}/asset/test-1`,
//     // data: req,
//     authToken,
//   });
//   console.log(resp.status);
//   const out = await resp.text();
//   console.log("--out--");
//   console.log(out);
// };

// export const playGate = async () => {
//   const base = "http://localhost:9010";
//   const authToken = "test-123";

//   const req: CmdRequestBody = {
//     command: "ps",
//   };

//   // const resp = await Fetches.fetchWithAuth({ url: `${base}/ps`, authToken });
//   const resp = await Fetches.fetchWithJson({
//     url: `${base}/cmd`,
//     data: req,
//     authToken,
//   });
//   console.log(resp.status);
//   const out = await resp.text();
//   console.log("--out--");
//   console.log(out);
// };

// export const playPerf = () => {
//   const returnId = Returns.addReturnListener({
//     onReturn: (data) => {
//       console.log("---backend---");
//       console.log(data);
//     },
//   });
//   const epoch = Date.now();
//   const perf = performance.now();
//   console.log("---browser---");
//   console.log({
//     epoch,
//     perf,
//   });
//   AppMessagesState.dispatch({
//     type: "app:time",
//     detail: {
//       returnId,
//       epoch,
//       perf,
//     },
//   });
// };

// export const playError = () => {
//   AppEvents.dispatchEvent("error", new Error("Something bad"));
// };

// export const playQuery = () => {
//   const { id: userId } = getUserState();
//   const query = SwrKeys.swrQueryObjectToKey({
//     parentId: userId,
//     objectType: "app-group",
//   });

//   const returnId = Returns.addReturnListener({
//     onReturn: (result) => {
//       console.log("result", result);
//     },
//   });
//   AppMessagesState.dispatch({
//     type: "dataObject:query",
//     detail: { query, returnId },
//   });
// };

// export const playSwr = () => {
//   // DataObjectStates.invalidate()

//   // DataObjectStates.dumpDataObjects();
// };

// export const playDebugAccess = async () => {
//   // const img1 = "data-1715015166669-94cfb197-3606-4e45-8348-f18d6e4524fa";
//   // const img2 = "data-1712762075961-6a51e1be-826a-463d-86e5-7c45a261e16e";
//   // const img3 = "data-1715016344297-037f5c63-0d27-44b9-8ab4-3a5f9a74fda0";
//   const img4 = 'data-1715018107106-45a749e9-b0f3-4dc1-891b-173fee1854d7'

//   {
//     const blob = await DatasState.dataIdToBlob(img4);
//     // openAppPopup(<DataImage id={img1} />);
//     BrowserFiles.writeFileBrowser("foo.png", blob!);
//     console.log(blob);
//   }
// };

// export const playAccess = () => {
//   const perm = Accesses.calcOctalPermissions({
//     user: PermissionLevel.EXECUTE,
//     group: PermissionLevel.READ,
//     world: PermissionLevel.NONE,
//   });
//   const perm2 = Accesses.calcOctalPermissions({
//     user: PermissionLevel.WRITE,
//     group: PermissionLevel.READ,
//     world: PermissionLevel.NONE,
//   });

//   console.log(Accesses.formatPermissions(perm));
//   console.log(Accesses.formatPermissions(perm2));
// };

// export const playLearnPars = () => {
//   type NumberLiteral = {
//     value: number;
//   };

//   const Lang = P.createLanguage<{ Number: NumberLiteral }>({
//     // Value: (r) => {
//     //   return P.alt(r.Number, r.Symbol, r.List);
//     // },
//     Number: () =>
//       P.regexp(/[0-9]+/)
//         .map(Number)
//         .map((value) => ({ value })),
//     // Symbol: () => P.regexp(/[a-z]+/).map((symbol) => ({ symbol })),
//     // List: (r) =>
//     //   P.string("(")
//     //     .then(r.Value.sepBy(r._))
//     //     .skip(P.string(")"))
//     //     .map((list) => ({ list })),
//     // _: () => P.optWhitespace,
//   });
//   // const parsed = Lang.Number.tryParse(
//   //   "(list 1 2 foo (list nice 3 56 989 asdasdas))"
//   // );
//   // console.log(parsed);
//   // console.log(JSON.stringify(parsed, undefined, 2));
// };

// export const text = `{char} is a 40 year old male who enjoys {userInfo.favoriteFood:good food}.

// (# this is an example of a comment
// They can be multiline or single line since there is an ending syntax character)

// (# conditional inclusion, with autoconversion to number via 'magic', newline signifies the end of the conditional logic part of the expression)
// ((userInfo.children > 0)

// {char} is proud to have {userInfo.children}

//   (# nested inclusions)
//   ((userInfo.children > 8)
//     which is way above average
//   )
// )

// (# truthy conversion based on existence)
// (userInfo.wifeName

// {char} has a wife named {userInfo.wifeName}

// )

// (# boolean algebra and 'soft code' where the LLM is used to evaluate the leaf nodes of the expression)
// ((isAngryConversation(conversation.summary) && isCalmCharacter(userInfo.personality))

// {char} always tries to calm down the situation when having a heated conversation

// )

// The current time of day is {time} (# builtin variables have no namespace)

// (# Examples of setting the chat state)

// (# if the character has children then figure out what the wife's name is)
// ((userInfo.children > 0) ? "What is {char}'s wife's name?" -> userInfo.wifeName)

// (# always attempt to figure out where the user went to school)
// (= "Where did {user} go to school?" -> userInfo.school)
// `;
// export const playTemplateParser = () => {
//   // Text parser for capturing text outside variables
//   const textParser = P.regexp(/[^{}]+/).map((value) => ({
//     type: "text",
//     value,
//   }));

//   // Base variable name parser without default text
//   const variableNameParser = P.regexp(/[a-zA-Z0-9_.]+/);

//   // Optional default text parser, assumes ':' has been confirmed
//   const defaultTextParser = P.regexp(/[^}]+/);

//   // Full variable parser, combining variable name and optional default text
//   const variableParser = variableNameParser.chain((variableName) =>
//     P.alt(
//       P.string(":")
//         .then(defaultTextParser)
//         .map((defaultText) => ({
//           type: "variable",
//           variable: variableName,
//           defaultText,
//         })),
//       P.succeed({
//         type: "variable",
//         variable: variableName,
//         defaultText: "",
//       })
//     )
//   );

//   // Complete language parser, parsing both text and variables
//   const languageParser = P.alt(
//     textParser,
//     P.string("{").then(variableParser).skip(P.string("}"))
//   ).many();

//   // Example parsing
//   const input = "Hello, {user: default user}! Your balance is {balance}.";
//   console.log(languageParser.parse(input));
// };

// export const playCodeParser = () => {
//   // Parser for text outside of variables and code blocks
//   const textParser = P.regexp(/[^{}()]+/).map((value) => ({
//     type: "text",
//     value,
//   }));

//   // Parser for variable names and optional default text
//   const variableParser = P.regexp(/\{([a-zA-Z0-9_.]+)(?::([^}]*))?\}/).map(
//     (result) => ({
//       type: "variable",
//       variable: result[1],
//       defaultText: result[2] || "",
//     })
//   );

//   // Recursive parser for code sections, defined using P.lazy to support recursion
//   const codeParser: P.Parser<{
//     type: string;
//     contents: any[];
//   }> = P.lazy(() =>
//     P.string("(")
//       .then(P.alt(codeParser, variableParser, textParser).many())
//       .skip(P.string(")"))
//       .map((contents) => ({
//         type: "code",
//         contents,
//       }))
//   );

//   // Main parser combining text, variables, and code sections
//   const languageParser = P.alt(textParser, variableParser, codeParser).many();

//   // Example usage
//   const input =
//     "This is a test (with a {variable: default} and (nested (even deeper) code)).";
//   console.log(languageParser.parse(input));
// };

// // Import JEXL
// import * as JEXL from "jexl";
// export const playMath = () => {
//   // Create a new JEXL instance
//   const jexl = new JEXL.Jexl();

//   // Simulated functions to get values (could be async or involve complex logic)
//   const getValueA = async () => {
//     console.log("Evaluating A");
//     return true; // Simulating the evaluation of A
//   };

//   const getValueB = async () => {
//     console.log("Evaluating B");
//     return true; // Simulating the evaluation of B
//   };

//   // Define your expression using variable names
//   const expression = "A() && B()";

//   // Define context with functions instead of direct values
//   const context = {
//     // A: () => getValueA(),
//     // B: () => getValueB(),
//   };

//   // Evaluate the expression
//   jexl.addFunction("A", getValueA);
//   jexl.addFunction("B", getValueB);
//   jexl
//     .eval(expression, context)
//     .then((result) => {
//       console.log("RESULT");
//       console.log(result); // This will output the result of the expression
//     })
//     .catch((err) => {
//       console.error("Evaluation error:", err);
//     });
// };

// export const playAipl = () => {
//   const text = `chat:message:assistant -> worker.hours ?
//   How many hours has {assistant} worked?

//   chat:message:assistant -> worker.payPerHour ?
//   How much money does {user} pay {assistant} per hour?

//   chat:message:assistant -> worker.history?
//   What has {user}'s recent work history been like?

//   chat:message:assistant(hasWorked(worked.hours)) -> worked.totalPay ?
//   How much pay should {assistant} receive for {worker.hours} if they earn {worker.payPerHour}/hr?

// chat:message:assistant(!isGoodWorkHistory(worker.history)||lessThanEightHoursWorked(worker.hours)) -> worker.lazy = "{user} is a lazy worker and {assistant} is upset with them"
// `;
//   const problemText = `
// chat:message:assistant(!isGoodWorkHistory(worker.history)||lessThanEightHoursWorked(worker.hours)) -> worker.lazy = "{user} is a lazy worker and {assistant} is upset with them"
// `;

//   const parsed = Aipls.parseAiplText(text);
// };

// export const playTextRender = () => {
//   // const text = `Be angry at {{user}} if {{foodDiary.lastMeal}} is not vegan! Otherwise just ask what {{user}}'s last meal was until you get an answer`;
//   const text = `Be angry at {{user}} if {{foodDiary.lastMeal}} is not vegan! Otherwise just ask what {{user}}'s last meal was until you get an answer`;
//   const values = {
//     assistant: "Reporter",
//     user: "bob",
//     date: "2/22/2024",
//     time: "5:37:29 PM",
//     "FoodDiary.LastMeal": "A mac roller",
//   };
//   const rendered = AiCharacters.renderCardText(text, values);
//   console.log(rendered);
// };

// export const playStreamParse = async () => {
//   const stopWords: ComplexStopWord[] = [
//     {
//       pre: "<",
//       mid: "[\\|bom]+",
//       post: ">",
//       name: "end of message",
//     },
//     {
//       pre: "<",
//       mid: "[\\|eom]+",
//       post: ">",
//       name: "end of message",
//     },
//   ];
//   const { reader, write, close } = createStreamParser({
//     stopWords,
//     onConsume: (word, stopWord) => {
//       console.log("CONSUMED", { word, stopWord });
//     },
//   });
//   // const writer = stream.writable.getWriter();
//   // const reader = stream.readable.getReader();
//   // console.log({ stream });
//   const sample = "<|bom|>This is a test<|eom|> and<|oem|> beyond";
//   const chars = sample.split("");

//   // chars.forEach((c) => writer.write(c));
//   write(sample);
//   write(sample);
//   close();
//   // writer.write("This is a test");
//   // writer.write("This is a test");
//   // writer.close();
//   const buf: string[] = [];
//   for (
//     let result = await reader.read();
//     !result.done;
//     result = await reader.read()
//   ) {
//     // console.log(`RESULT: ${result.value}`, { result });
//     buf.push(result.value);
//   }
//   console.log(`BEFORE:   '${sample}'`);
//   console.log(`FINISHED: '${buf.join("")}'`);
// };

// export const playParseFunc = () => {
//   const text = `First I will create the time traveler character then add some updates regarding his profession and abilities.

//   🧑:create(type="character", name="Bart");
//   Bart has been created as a new time traveler character.

//   🧑:update(name="Bart", type="character", fieldName="profession", value="magician");
//   Bart's profession has been updated to Magician.

//   To further enhance his character and give him some additional relevant traits for being a time traveling magician, we could add more details later as needed.`;

//   const parsed = AiFunctions.parseAiFunctionText(text);
//   console.log(parsed);

//   const arg =
//     'name="Beth", type="character", fieldName="dialogue", value="[\\"Greetings everyone, you\'ve found yourselves at my charming dwelling!\\", \\"Calm yourselves dear souls for every property has its escape routes.\\", \\"Join me in the parlour as we break bread together.\\"]"';
// };

// export const playIngest = async (characterId: string) => {
//   console.log("playing with", [characterId]);

//   // const ingestResults = DataObjectStates.getChildDataObjects(
//   //   characterId,
//   //   "ingest-result"
//   // );
//   // DataObjectStates.findChildDataObjects(characterId);

//   // console.log("ingest-results", [ingestResults]);
//   // const searchResults = await searchVectorStore({
//   //   namespaceId: characterId,
//   //   query: "crunch",
//   // });
//   // console.log("search-results", [searchResults]);

//   const corpusDocuments = DataObjectStates.getChildDataObjects(
//     characterId,
//     "corpus-document"
//   );
//   console.log("corpus-docs", [corpusDocuments]);
//   const dataIds = corpusDocuments.map((doc) => doc.dataId).filter(isDefined);

//   console.log("ingest", [dataIds]);
//   AppMessagesState.dispatch({
//     type: "ingest",
//     detail: {
//       dataIds,
//       enableOcr: false,
//       namespaceId: characterId,
//     },
//   });
// };

// export const playImagegen = async () => {
//   const { aiBaseUrl: homeBaseUrl } = getAppState();
//   const { authToken } = getUserState();

//   const url = `${homeBaseUrl}/gate/sdapi/v1/sd-models`;
//   const resp = await Fetches.fetchWithAuth({
//     url,
//     data: undefined,
//     authToken,
//     options: {
//       headers: {
//         "X-SERVICE": "imagegen",
//       },
//     },
//   });
//   console.log(resp);
//   const text = await resp.text();
//   console.log("text", [text]);

//   // return fetchWithAuth(fullPath, wavSample, {
//   //   method: "PUT",
//   //   headers: {
//   //     "X-SERVICE": "tts",
//   //   },
//   // });
// };

// export const playWs = async () => {
//   console.log("play");

//   // const ws = new WebSocket(`ws:localhost:8787/ws`, [
//   //   "access_token",
//   //   "foobarbaz1111",
//   // ]);
//   //  const ws = new WebSocket(`ws:localhost:8787/ws`);

//   // const ws = await getHomeBaseWebSocket();

//   const pingMessage: AppMessage<"ping"> = {
//     type: "ping",
//     detail: "foo",
//   };
//   // AppMessages.dispatch(pingMessage);
//   // updateAppState((state) => {
//   //   state.ws = ws;
//   // });
//   // console.log("ws", [ws]);
// };

// export const playWc = async () => {
//   const { aiBaseUrl } = getAppState();
//   const wcUrl = `${aiBaseUrl}/crawl`;
//   const crawlRequest: CrawlParams = {
//     // url: "https://www.example.com",
//     url: "https://www.radix-ui.com/themes/docs/overview/getting-started",
//     maxRequestsPerCrawl: 5,
//   };
//   const response = await fetchWithJson(wcUrl, crawlRequest, {
//     headers: {
//       "X-SERVICE": "crawl",
//     },
//   });
//   if (!response.body) {
//     console.error("no body");
//     return;
//   }
//   console.log("body", [response.body]);
//   // const text = await response.text();
//   // console.log(text)
//   // console.log("text", [text]);

//   const stream = new TextDecoderStream();
//   const pipe = response.body.pipeThrough(stream);
//   const reader = pipe.getReader();
//   Parsers.createSseParser<CrawlDocument>({
//     consumer: (doc) => {
//       console.log("doc", [doc?.title, doc?.url]);
//     },
//     dataParser: (data) => {
//       // console.log("data", [data]);
//       return JSON.parse(data);
//     },
//     reader,
//   });
// };

// export const playUrlViewer = async () => {
//   // // const targetUrl = "https://worderful.xyz";
//   // const targetUrl = "https://www.google.com";
//   const targetUrl = "https://www.radix-ui.com/"

//   // const { aiBaseUrl } = getAppState();

//   // const resp = await fetchWithAuth(`${aiBaseUrl}/proxy`, undefined, {
//   //   headers: {
//   //     "X-SERVICE": "proxy",
//   //     "X-PROXY": targetUrl,
//   //   },
//   // });
//   // console.log("resp", resp);
//   // if (!resp) {
//   //   return console.log("no resp");
//   // }
//   // const text = await resp.text();
//   // console.log("text", [text]);
//   openUrlViewer(targetUrl);
// };

// export const genRandomThought = () => {
//   const fooThoughtId = `foo-${crypto.randomUUID()}`;
//   const thought = createThought({
//     id: fooThoughtId,
//     score: 1,
//     documents: [
//       {
//         id: `foo-doc-${fooThoughtId}`,
//         name: `Doc-${fooThoughtId}`,
//         text: "Lorem ipsom stuffs",
//       },
//     ],
//     text: `${fooThoughtId}`,
//     animations: createFloatToPostionAnimations({
//       frames: 60 * 3,
//       onEnd: () => {
//         console.log("GOT FOO END");
//       },
//       startPos: [0, 0],
//       targetPos: [500 * Math.random(), Math.random() * 200],
//       thoughtId: fooThoughtId,
//     }),
//   });
//   updateThoughtCloudState((state) => {
//     state.thoughts.push(thought);
//   });
// };

// export const playThought = async () => {
//   while (generating) {
//     genRandomThought();
//     await waitTimeout(500);
//   }
// };

// export const playTika = () => {
//   // const
// };

// export const playDocs = async (params: [string, string]) => {
//   const [docIdxId, docId] = params;
//   console.log({ docIdxId, docId });
//   const doc = DataIndexesStates.getDataIndexStateRecord<CorpusDocument>(
//     docIdxId,
//     docId
//   );
//   console.log(doc);
//   const dataResp = await Datas.getBackendData(doc?.dataId!);
//   console.log(Object.fromEntries(dataResp.headers.entries()));
//   if (!dataResp.ok) {
//     console.error(dataResp);
//   }
//   const blob = await dataResp.blob();
//   console.log(blob);

//   const base = "https://tika.worderful.xyz";
//   // const tikaResp = await fetch("http://localhost:8000/gate/tika", {
//   const url = `${base}/gate/tika`;
//   console.log(url);

//   const tikaResp = await fetch(url, {
//     method: "PUT",
//     body: blob,
//     headers: {
//       Authorization: "Bearer token-c9f9c969-5d49-4ab0-8cdb-e7e003a88d9b",
//       "Content-Type": blob.type,
//       "X-Tika-OCRskipOcr": "true",
//       Accept: "text/plain",
//     },
//   });
//   console.log(tikaResp);
//   console.log(Array.from(tikaResp.headers.entries()));

//   if (!tikaResp.body) {
//     console.log("NO BODY!");
//     return;
//   }

//   const text = await tikaResp.text();
//   console.log(text);
//   const chunks = text
//     .split("\n")
//     .map((t) => t.trim())
//     .filter((t) => t.length > 5);
//   // const chunks = await Extracts.blobToChunks(blob, doc?.mediaType);
//   console.log("chunks", chunks);
// };

// export const playDetectAfterStop = () => {
//   const text = `UNKNOWN<|im_end`;
//   const resp = detectStopAfter(text, ["UNKNOWN"]);
//   console.log(resp);
// };

// export const playGetGoals = async () => {
//   // const { aiCharacterId } = getChatState();
//   // const character = getCharacter(aiCharacterId);
//   // if (!character) {
//   //   return console.log(`No character: ${aiCharacterId}`);
//   // }
//   // const question = `Give me a an ordered numbered list of the goals for ${character.card.data.name}`;
//   // const ans = await askQuestionOfChat({
//   //   systemMessage: "You are an AI that must answer all questions truthfully",
//   //   userMessage: question,
//   // });
//   // // tolist
//   // console.log(question);
//   // console.log(ans);
//   // const list = parseTextToList(ans);
//   // console.log(list);

//   const goal = "getting customer name";

//   const question = `Has the goal of '${goal}' been achieved?`;
//   const stopAfter = ["yes", "no", "unknown"].map(toCommonCases).flat();
//   const resp = await askQuestionOfChatId({
//     systemMessage:
//       "You are a truthful AI program that only responds with YES, NO, or UNKNOWN",
//     userMessage: question,
//     stopAfter,
//   });
//   console.log(resp);
// };

// export const playLooseParser = () => {
//   const text = `{"Name": "CSR agent- AI character", "Company": "HPE Aruba", "Position": "Customer Success Representative", "Education": "College degree and MBA", "Personality": "Ambitious, polite, customer-oriented", "Goals": {"Confirm contact collection", "Assist with creating HPE GreenLake account", "Add Aruba Central to apps", "Add licenses", "Add devices", "Establish next steps for Aruba Central journey"}, "Contact information": {"Email": "none provided", "Phone number": "555-1212"}}
//   `;

//   //   const text = `CSR agent- AI character learned":
//   // - customer's email address
//   // - customer's phone number
//   // - customer's preference for creating the HPE GreenLake account now
//   // }`;

//   const res = looseParse(text);
//   console.log(res);
//   console.log(JSON.stringify(res, undefined, 2));
// };

// export const playTts = () => {
//   speak("hello world");
// };

// export const playCreateDataObject = async () => {
//   const resp = await createBackendDataObject("ai-bot");
//   console.log(resp.status);
//   console.log(resp.statusText);
//   const text = await resp.text();
//   console.log({ resp, text });
// };

// export const stopPlay = () => {
//   // const text = `e should take it. Perhaps a more practical question would be more suitable? What do you think?<|im_end|>
//   // In this conversation, the AI Large Language Model provides a humorous and creative response to the `;

//   // const text2 = ""

//   // const text = `"Oh, boy! Let me tell ya, it was a different time back then! I tell ya, the city was a lot smaller, but it was a lot more vibrant. Everyone knew each other, and we all looked out for each other. It was a real community, you know? People actually talked to each other on the street, and they didn't have all these fancy gadgets to distract 'em! (chuckles)
//   // But, I tell ya, it wasn't all good. There was a lot of poverty and crime, and it was a tough place to make a living. But, we had a spirit, a fire in our bellies that kept us going. We were a city of immigrants, and we were all trying to make a better life for ourselves and our families. And, I tell ya, we worked hard for it! We built this city with our own two hands, and we made it into something special.
//   // Now, I ain't gonna sit here and tell you it was all rainbows and sunshine. There was a lot of struggle, and there were a lot of tough times. But, I tell ya, we made it through, and we came out stronger on the other side. And, I tell ya, that's what makes this city so special. We're a city of fighters, and we never give up! I tell ya!<|im_end|>"`;

// const text = `'chat, tagging, ai, language, model, user, request, decision, making, recommendations, answer, question, 3+3, assistance, today<|im_end|>\n<|im_start|>user\nwhat are the best ways to learn a new language?<|im_end|>\n<|im_start|>AI\nThere are several ways to learn a new language, including:\n1. Immersion: Surround yourself with the language by listening to music, watching TV shows or movies, and speaking with native speakers.\n2. Language classes: Enroll in a language class at a local college or language school, or take an online course.\n3. Language exchange programs: Find a language exchange partner to practice speaking with.\n4. Language learning apps: There are many apps available that can help you learn a new language, such as Duolingo, Babbel, and Rosetta Stone.\n5. Flashcards: Create flashcards with new vocabulary words and phrases and review them regularly.\n6. Reading and writing: Practice reading and writing in the new language by reading books, articles, and writing your own sentences or paragraph'`
//   const { stop } = getAppState();
//   console.log(text);

//   const result = detectStop(text, stop);
//   console.log(result);
//   console.log(result[0]);
// };

// export const playCfAi = async () => {
//   const resp = await fetchAi("/ai/cf", {
//     prompt: "write a poem about AI",
//     stream: true,
//   });
//   console.log({ resp });
// };

// export const playData = async () => {
//   const testData = {
//     id: "test-100",
//     foo: "TEST 123",
//     bar: "TEST 999",
//   };
//   const testData2 = {
//     id: "test-101",
//     foo: "TEST 123",
//     bar: "TEST 999",
//   };
//   const testDatas = [testData, testData2];
//   {
//     const resp = await putBackendDataObjects(testDatas);
//     console.log(resp);
//     const text = await resp?.text();
//     console.log(`text: '${text}'`);
//   }
//   {
//     console.log("---reading---");
//     const resp = await getBackendDataObjects([testData.id, testData2.id]);
//     console.log(resp);
//     resp?.headers.forEach((value, key) => {
//       console.log({ key, value });
//     });
//     const text = await resp?.text();
//     console.log(`text: '${text}'`);
//   }

// {
//   console.log("---reading---");
//   const resp = await getBackendData(testData.id);
//   console.log(resp);
//   resp?.headers.forEach((value, key) => {
//     console.log({ key, value });
//   });
//   const text = await resp?.text();
//   console.log(`text: '${text}'`);
// }
// };

// export const playTC = async () => {
//   const characterId = "4882faa7-65c4-4373-a941-40d16553ac94";
//   const character = getCharacter(characterId);
//   const pngBytes = await tavernCardToPng(character.card, character.image);
//   console.log({ pngBytes });

//   const cards = await pngToTavernCards(pngBytes);
//   console.log({ cards });
// };

// export const playImages = async () => {
//   const resp = await askRestfulAiImages({
//     prompt: "A cute dog",
//   });

//   console.log(resp);

//   // const resp = await
// };

// export const playCompletions = async () => {
//   const resp = await askAi({
//     prompt: "what is 2 + 5?",
//   });
//   console.log(`r: ${resp}`);
// };

// export const playChatCompletions = async () => {
//   const resp = await askRestfulAiChatCompletions({
//     mode: "chat",
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful AI",
//       },
//       // {
//       //   role: "system",
//       //   content: "You only respond in JSON",
//       // },
//       {
//         role: "assistant",
//         content: "Hello!",
//         name: "Bob",
//       },
//       {
//         role: "user",
//         name: "Alice",
//         content: "count to 8",
//       },
//     ],
//   });
//   console.log(resp);
//   resp.choices.forEach((c) => {
//     console.log(JSON.stringify(c.message, undefined, 2));
//   });
// };

// export const playSse = async () => {
//   const { aiBaseUrl } = getAppState();

//   const stream = new TextDecoderStream();
//   const response = await fetch(`${aiBaseUrl}/test/sse`, {
//     method: "POST",
//   });
//   const reader = response.body.pipeThrough(stream).getReader();

//   while (true) {
//     const { value, done } = await reader.read();
//     console.log(`RAW: ${value} ${done}`);
//     if (done) {
//       reader.cancel();
//       break;
//     }
//   }
// };

// export const playChatCompletionsStream = async () => {
//   // return playSse();
//   const resp = await askRestfulAiCompletionsStream(
//     (value) => {
//       console.log(value);
//     },
//     {
//       prompt: "User: What is 9*9?\nAI: ",
//       // mode: "chat",
//       // messages: [
//       //   {
//       //     role: "system",
//       //     content: "You are a helpful AI",
//       //   },
//       //   // {
//       //   //   role: "system",
//       //   //   content: "You only respond in JSON",
//       //   // },
//       //   {
//       //     role: "assistant",
//       //     content: "Hello!",
//       //     name: "Bob",
//       //   },
//       //   {
//       //     role: "user",
//       //     name: "Alice",
//       //     content: "count to 8",
//       //   },
//       // ],
//     }
//   );
//   console.log(resp);
//   // resp.choices.forEach((c) => {
//   //   console.log(JSON.stringify(c.message, undefined, 2));
//   // });
// };
