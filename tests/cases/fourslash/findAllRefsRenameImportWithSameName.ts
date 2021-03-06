/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 0;|]

//@Filename: /b.ts
////[|import { [|{| "contextRangeIndex": 2 |}x|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] } from "./a";|]
////[|x|];

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();
const aRanges = [r0, r1];
const bRanges = [r2, r3];
const aGroup = { definition: "const x: 0", ranges: aRanges };
const bGroup =  { definition: "(alias) const x: 0\nimport x", ranges: bRanges };
verify.referenceGroups(aRanges, [aGroup, bGroup]);
verify.referenceGroups(bRanges, [bGroup]);

verify.renameLocations(r0, [r0, r1, r2, r3]);
verify.renameLocations(r1, [r0, r1, r2, r3]);
verify.rangesAreRenameLocations([r2, r3]);
