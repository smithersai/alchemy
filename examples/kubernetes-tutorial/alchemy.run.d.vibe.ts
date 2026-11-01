import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Alchemy from "alchemy";
import { Stage } from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    namespace: Alchemy.Output<string, never>;
    service: Alchemy.Output<string, never>;
    smokeTest: Alchemy.Output<string, never>;
}, NoInfer<Kubernetes.Providers | Stage>>;
export default _default;
