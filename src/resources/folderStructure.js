export const dirStructure = {
  name: "root",
  isDir: true,
  items: [
    {
      name: "public",
      isDir: true,
      items: [
        {
          name: "index.html",
          isDir: false,
        },
      ],
    },
    {
      name: "src",
      isDir: true,
      items: [
        {
          name: "Components",
          isDir: true,
          items: [
            {
              name: "Directory.js",
              isDir: false,
            },
          ],
        },
        {
          name: "Data",
          isDir: true,
          items: [
            {
              name: "directoryStructure.js",
              isDir: false,
            },
          ],
        },
        {
          name: "App.js",
          isDir: false,
        },
        {
          name: "index.js",
          isDir: false,
        },
        {
          name: "style.css",
          isDir: false,
        },
      ],
    },
    { name: "package.json", isDir: false },
  ],
};
