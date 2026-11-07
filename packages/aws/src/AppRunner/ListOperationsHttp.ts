import * as apprunner from "@distilled.cloud/aws/apprunner";
import { makeAppRunnerHttpBinding } from "./BindingHttp.ts";
import { ListOperations } from "./ListOperations.vibe";
import type { Service } from "./Service.vibe";

/**
 * HTTP implementation of the {@link ListOperations} binding. Calls
 * `apprunner:ListOperations` with the Lambda's IAM role, scoped to the
 * bound service.
 */
export const ListOperationsHttp = makeAppRunnerHttpBinding(ListOperations, {
  operation: apprunner.listOperations,
  spec: (service: Service) => ({
    identifiers: { ServiceArn: service.serviceArn },
    iam: () => ({
      actions: ["apprunner:ListOperations"],
      resources: [service.serviceArn],
    }),
  }),
});
