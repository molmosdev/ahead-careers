const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

const envFile = `export const environment = {
    SANITY_PROJECT_ID: '${process.env.SANITY_PROJECT_ID}',
    SANITY_DATASET: '${process.env.SANITY_DATASET}',
    SANITY_TOKEN: '${process.env.SANITY_TOKEN}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.ts');
fs.writeFile(targetPath, envFile, err => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`
    );
  }
});
