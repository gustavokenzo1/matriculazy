import puppeteer from "puppeteer";

export async function getDepartments(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const departments = await page.$$eval(
    "select[id='formTurma:inputDepto'] > option",
    (el) =>
      el.map((department: any) => {
        return {
          name: department.textContent,
          value: department.value,
        };
      })
  );
  await browser.close();

  departments.shift();

  return departments;
}