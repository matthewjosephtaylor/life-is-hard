// import P, { Parser } from "parsimmon";

// export const aiplParser = (text: string) => {
//   // Parser for text outside of variables and code blocks
//   const textParser = P.regexp(/[^{}()]+/).map(
//     (value) =>
//       ({
//         type: "text",
//         value,
//       } as const)
//   );

//   const symbolNameParser = P.regexp(/[a-zA-Z0-9_.]+/);
//   const operatorParser = P.regexp(/[><|!&]+/);
//   const numberParser = P.regexp(/[0-9]+/).map((value) => Number(value));

//   const innerTemplateVariable = symbolNameParser.chain((variableName) =>
//     P.alt(
//       P.string(":")
//         .then(P.regexp(/[^}]+/))
//         .map((defaultText) => ({
//           type: "templateVariable",
//           variable: variableName,
//           defaultText,
//         })),
//       P.succeed({
//         type: "templateVariable",
//         variable: variableName,
//         defaultText: undefined,
//       })
//     )
//   );

//   const templateVariableParser = P.string("{")
//     .then(innerTemplateVariable)
//     .skip(P.string("}"));

//   const commentParser = P.string("(#").then(
//     P.regex(/[^)]+/)
//       .skip(P.string(")"))
//       .map(
//         (text) =>
//           ({
//             type: "comment",
//             text,
//           } as const)
//       )
//   );

//   const functionParser = P.seq(
//     symbolNameParser,
//     P.optWhitespace,
//     P.string("("),
//     P.regex(/[^)]+/),
//     P.string(")")
//   ).map(
//     (value) =>
//       ({
//         type: "function",
//         functionName: value[0],
//         functionArgs: value[3],
//       } as const)
//   );

//   type AiplSpec = {
//     text: { type: "text"; value: string };
//     number: number;
//     symbol: string;
//     operator: string;
//     comment: { type: "comment"; text: string };
//     assignment: {
//       type: "assignment";
//       question: string;
//       variableName: AiplSpec["identifier"];
//     };
//     templateVariable: string;
//     identifier: { type: "identifier"; value: string };
//     function: { type: "function"; functionName: string; functionArgs: string };
//     expr: {
//       type: "expr";
//       value: AiplSpec["function" | "identifier" | "compoundExpr" | "number"];
//     };
//     compoundExpr: {
//       type: "compoundExpr";
//       op: AiplSpec["operator"];
//       left: AiplSpec["compoundExpr" | "expr"];
//       right: AiplSpec["compoundExpr" | "expr"];
//     };
//     code: {
//       type: "code";
//       condition: AiplSpec["expr"];
//       body: AiplSpec["program"];
//     };
//     template: {
//       type: "template";
//       value: (AiplSpec["templateVariable"] | string)[];
//     };

//     program: {
//       type: "program";
//       value: AiplSpec[
//         | "comment"
//         | "assignment"
//         | "text"
//         | "templateVariable"
//         | "code"][];
//     };

//     conditionalAssignment: {
//       type: "conditionalAssignment";
//       condition: AiplSpec["expr"];
//       question: AiplSpec["template"];
//       variableName: AiplSpec["identifier"];
//     };
//   };

//   const lang = P.createLanguage<AiplSpec>({
//     text: () => textParser,
//     number: () => numberParser,
//     template: (r) =>
//       P.alt(r.templateVariable, P.regex(/[^{}"]+/))
//         .many()
//         .map((value) => ({ type: "template", value })),
//     symbol: () => symbolNameParser,
//     identifier: () =>
//       symbolNameParser.map(
//         (value) =>
//           ({
//             type: "identifier",
//             value,
//           } as const)
//       ),
//     operator: () => operatorParser,
//     comment: () => commentParser,
//     templateVariable: () => templateVariableParser,
//     function: () => functionParser,
//     conditionalAssignment: (r) =>
//       P.seq(
//         P.string("("),
//         P.optWhitespace,
//         r.expr,
//         P.optWhitespace,
//         P.string("?"),
//         P.optWhitespace,
//         P.string('"'),
//         r.template,
//         P.string('"'),
//         P.optWhitespace,
//         P.string("->"),
//         P.optWhitespace,
//         r.symbol,
//         P.optWhitespace,
//         P.string(")")
//       ).map(
//         (value) =>
//           ({
//             type: "conditionalAssignment",
//             condition: value[2],
//             question: value[7],
//             variableName: value[12],
//           } as const)
//       ),
//     assignment: (r) =>
//       P.seq(
//         P.string("(="),
//         P.optWhitespace,
//         P.string('"'),
//         r.template,
//         P.string('"'),
//         P.optWhitespace,
//         P.string("->"),
//         P.optWhitespace,
//         r.symbol,
//         P.optWhitespace,

//         P.string(")")
//       ).map(
//         (value) =>
//           ({
//             type: "assignment",
//             question: value[3],
//             variableName: value[8],
//           } as const)
//       ),

//     compoundExpr: (r) =>
//       P.seq(
//         P.string("("),
//         P.optWhitespace,
//         P.alt(r.compoundExpr, r.expr),
//         P.optWhitespace,
//         operatorParser.map((op) => ({ op })),
//         P.optWhitespace,
//         P.alt(r.compoundExpr, r.expr),
//         P.optWhitespace,
//         P.string(")")
//       ).map(
//         (result) =>
//           ({
//             type: "compoundExpr",
//             left: result[2],
//             op: result[4],
//             right: result[6],
//           } as const)
//       ),

//     expr: (r) =>
//       P.alt(r.compoundExpr, r.function, r.identifier, r.number).map(
//         (value) => ({
//           type: "expr",
//           value,
//         })
//       ),

//     code: (r) =>
//       P.seq(P.string("("), P.alt(r.expr), r.program, P.string(")")).map(
//         (value) =>
//           ({
//             type: "code",
//             condition: value[1],
//             body: value[2],
//           } as const)
//       ),
//     program: (r) =>
//       P.alt(
//         r.comment,
//         r.assignment,
//         r.conditionalAssignment,

//         // r.template,
//         r.text,
//         r.templateVariable,

//         r.code
//       )
//         .many()
//         .map((value) => ({ type: "program", value } as const)),
//   });

//   const ast = lang.program.tryParse(text);

//   return ast;
// };
