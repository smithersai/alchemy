// The platform code of ManagedLoginBranding.vibe, which a .vibe file does not import as a value (EK4402).

import * as cip from "@distilled.cloud/aws/cognito-identity-provider";

/** Canonicalize an asset list for order-insensitive comparison; bytes are
 * folded to base64. */
export const canonicalAssets = (assets: cip.AssetType[] | undefined) =>
  (assets ?? [])
    .map((asset) =>
      [
        asset.Category,
        asset.ColorMode,
        asset.Extension,
        asset.ResourceId ?? "",
        asset.Bytes === undefined ? "" : Buffer.from(asset.Bytes).toString("base64"),
      ].join(":"),
    )
    .sort()
    .join(",");
