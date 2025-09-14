module.exports = {
  contents: ["_sidebar.md"],
  emulateMedia: "screen",
  mainMdFilename: "README.md",
  pathToPublic: "tmp/guide.pdf",
  pdfOptions: "<options for puppeteer.pdf()>", // reference: https://pptr.dev/api/puppeteer.pdfoptions
  removeTemp: true,
};
