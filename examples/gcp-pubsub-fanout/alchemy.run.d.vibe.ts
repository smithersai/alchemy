import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    project: Alchemy.Output<string, never>;
    topicName: Alchemy.Output<string, never>;
    deadLetterTopicName: Alchemy.Output<string, never>;
    deadLetterSubscription: Alchemy.Output<string, never>;
    bucketName: Alchemy.Output<string, never>;
    tableName: Alchemy.Output<string, never>;
    emailService: Alchemy.Output<string, never>;
    analyticsService: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;
