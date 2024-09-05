import { Objects, isUndefined } from "@mjtdev/engine";
import type { AppReportAnswers } from "ai-worker-common";

export const factsToReports = (facts: Record<string, string | undefined>) => {
  const reports: AppReportAnswers[] = [];
  for (const [key, value] of Objects.entries(facts)) {
    const parts = key.split(".");

    const [namespace, ...rest] = parts;
    if (!namespace || namespace.length === 0 || parts.length === 1) {
      continue;
    }
    let report = reports.find((r) => r.name === namespace);
    if (isUndefined(report)) {
      report = { name: namespace, fields: [] };
      reports.push(report);
    }
    const fieldName = rest.join("");
    let field = report.fields.find((f) => f.name === fieldName);
    if (isUndefined(field)) {
      field = {
        name: fieldName,
        answer: value,
      };
      report.fields.push(field);
    }
    field.answer = value;
  }
  return reports;
};
