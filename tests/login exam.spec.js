const { test, expect } = require("@playwright/test");

test("Positive LogIn test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Open page

  await page.goto("https://practicetestautomation.com/practice-test-login/");
  await page.waitForLoadState("networkidle");

  //Type username student into Username field

  await page.locator("#username").fill("student");
  //Type password Password123 into Password field

  await page.locator("#password").fill("Password123");
  //Push Submit button

  await page.getByRole("button", { name: "Submit" }).click();

  //Verify new page URL contains practicetestautomation.com/logged-in-successfully/

  await expect(
    page.locator("https://practicetestautomation.com/practice-test-login/")
  ).toBeTruthy();

  //Verify new page contains expected text ('Congratulations' or 'successfully logged in')

  const configurationmassage = page.locator(".has-text-align-center");
  await expect(configurationmassage).toContainText(
    "Congratulations student. You successfully logged in!"
  );
  //Verify button Log out is displayed on the new page

  await expect(
    page.locator(
      '//*[@href="https://practicetestautomation.com/practice-test-login/"]'
    )
  ).toContainText("Log out");
});

test("Negative username test", async ({ page }) => {
  // Open page

  await page.goto("https://practicetestautomation.com/practice-test-login/");
  await page.waitForLoadState("networkidle");

  // Type username incorrectUser into Username field
  await page.locator("#username").fill("incorrectUser");
  await page.locator("#password").fill("Password123");
  // Push Submit button
  await page.getByRole("button", { name: "Submit" }).click();

  //Verify error message is displayed

  const error = page.locator(".show");

  await expect(error).toBeVisible();
  await page.waitForTimeout(1000);
  //Verify error message text is Your username is invalid!

  await expect(error).toContainText("Your username is invalid!");
});

test("Negative password test", async ({ page }) => {
  //Open page
  await page.goto("https://practicetestautomation.com/practice-test-login/");
  await page.waitForLoadState("networkidle");

  // Type username student into Username field
  await page.locator("#username").fill("student");
  await page.locator("#password").fill("incorrectPassword");
  // Push Submit button
  await page.getByRole("button", { name: "Submit" }).click();

  //Verify error message is displayed

  const error = page.locator(".show");

  await expect(error).toBeVisible();
  await page.waitForTimeout(1000);

  // Verify error message text is Your password is invalid!

  await expect(error).toContainText("Your password is invalid!");
});
