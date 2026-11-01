import * as Layer from "effect/Layer";
import { GetDocument } from "./GetDocument.js";
/**
 * HTTP implementation of {@link GetDocument}.
 *
 * @layer
 * @provides GCP.Firestore.GetDocument
 */
export declare const GetDocumentHttp: Layer.Layer<GetDocument, never, never>;
