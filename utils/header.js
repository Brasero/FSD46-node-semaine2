export const header = (path) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Kittens - Liste des chatons</title>
      <link rel="stylesheet" href=${path} type="text/css" />
    </head>
  `
}