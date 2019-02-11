import PageService from "../src/wiki/PageService";

test("Can read file", async () => {
  const service = new PageService();
  const page = await service.getPage("text");
  expect(page.length).toBeGreaterThan(1);
});

test("Can write file", async () => {
  const service = new PageService();
  expect(async () => {
    await service.savePage("test", "this is a new page.");
  }).not.toThrowError();
});

test("File name validation fails debug", async () => {
  const service = new PageService();
  try {
    await service.savePage("test.txt", "this is a new page.");
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
});
test.only("Get Wiki Pages", async () => {
  const service = new PageService();
  const pages = await service.getPages();
  expect(pages.length).toBeGreaterThan(1);
});
