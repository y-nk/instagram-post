import { Page } from "playwright-core";

export async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginToIg(
  page: Page,
  username: string,
  password: string
) {
  await page.goto("https://www.instagram.com/accounts/login/");

  // login
  await page.locator('#loginForm input[name="username"]').fill(username);
  await page.locator('#loginForm input[name="password"]').fill(password);
  await page.click('#loginForm button[type="submit"]');
}

export async function bypassSaveInfo(page: Page) {
  try {
    await page.waitForURL(/onetap/i, { timeout: 10000 });

    const saveInfo = await page.$("text='Not Now'");
    if (saveInfo) await saveInfo.click();
  } catch {}
}

export async function bypassNotifPopup(page: Page) {
  try {
    await page.waitForURL("https://www.instagram.com/", { timeout: 5000 });

    const notifPopup = await page.$(`text='Turn on Notifications'`);
    if (notifPopup) await page.locator(`text='Not Now'`).click();
  } catch {}
}

export async function uploadPicture(page: Page, picture: string) {
  // click Create button
  const { width, height } = page.viewportSize()!;
  await page.mouse.click(width * 0.5, height - 10);

  // handle upload
  page.once(`filechooser`, async (fileChooser) => {
    await fileChooser.setFiles(picture);
  });

  // click `select file`
  await page.locator(`text='Select from device'`).click();
}

export async function cropPicture(page: Page) {
  // crop popup
  await page.locator(`button:has([aria-label='Select crop'])`).click();

  // select original
  await page
    .locator("button", { has: page.locator(`text='Original'`) })
    .click();

  // press next (validate crop)
  await page.locator(`text='Next'`).click();
}

export async function addFilter(page: Page) {
  // press next (validate filter: no filter)
  await page.locator(`text='Next'`).click();
}

export async function addCaption(page: Page, caption: string) {
  // fill caption
  await page.locator('[contenteditable="true"]').fill(caption);
}

export async function pressShare(page: Page) {
  await page.locator(`text='Share'`).click();
}
