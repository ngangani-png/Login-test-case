const { test, expect } = require("@playwright/test");
const url = "https://practicetestautomation.com/practice-test-login/";
const logout = "https://practicetestautomation.com/logged-in-successfully/";
test.beforeEach(async ({ page }) => {
  // Nevigat Page
  await page.goto(url);
  await page.waitForLoadState("networkidle");
});

// Login Function
async function callfunc(page, Username, Password) {
  await page.locator("#username").fill(Username);
  await page.locator("#password").fill(Password);
  await page.getByRole("button", { name: "Submit" }).click();
}

const objerror = {
  erroruser: "Your username is invalid!",
  errorpassword: "Your password is invalid!",
};

test("Positive LogIn test", async ({ page }) => {
  const masg = "Congratulations student. You successfully logged in!";
  await callfunc(page, "student", "Password123");
  await expect(page).toHaveURL(logout);

  await expect(page.locator(".has-text-align-center")).toContainText(masg);
  await expect(page.locator(`//*[@href='${url}']`)).toContainText("Log out");
});

test("Negative username test", async ({ page }) => {
  await callfunc(page, "incorrectUser", "Password123");
  const error = page.locator(".show");
  await expect(error).toBeVisible();
  await expect(error).toContainText(objerror.erroruser);
});

test("Negative password test", async ({ page }) => {
  await callfunc(page, "student", "incorrectPassword");
  const error = page.locator(".show");
  await expect(error).toBeVisible();
  await expect(error).toContainText(objerror.errorpassword);
});
