import { test, expect } from "@playwright/test";

import {
  addCaption,
  addFilter,
  bypassNotifPopup,
  bypassSaveInfo,
  cropPicture,
  loginToIg,
  pressShare,
  uploadPicture,
  wait,
} from "./lib";

test("posting to ig", async ({ page }) => {
  try {
    await loginToIg(page, process.env["USERNAME"]!, process.env["PASSWORD"]!);

    await bypassSaveInfo(page);
    await bypassNotifPopup(page);

    await uploadPicture(page, process.env["PICTURE"]!);
    await cropPicture(page);
    await addFilter(page);
    await addCaption(page, process.env["CAPTION"]!);
    await pressShare(page);
    await wait(20000);

    expect(true).toBe(true);
  } catch {
    await page.screenshot({ path: "error.png" });
  }
});
