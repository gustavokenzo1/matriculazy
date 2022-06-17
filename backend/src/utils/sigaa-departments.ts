import axios from "axios";

const cheerio = require("cheerio");

export const scrapeDepartments = async (url: string) => {
  const response = await axios.get(url);
  const html = await response.data;
  const $ = cheerio.load(html);
  const departmentsItems = $('select[id="formTurma:inputDepto"]');

  const departments: object[] = [];

  departmentsItems.each((_: any, el: any) => {
    $(el)
      .children()
      .map((_: any, el: any) => {
        const department = { name: "", value: 0 };

        department.name = $(el).text();
        department.value = $(el).val();

        departments.push(department);
      });
  });

  departments.shift();

  return departments;
};
