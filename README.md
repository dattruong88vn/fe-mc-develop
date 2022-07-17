`npm install -g yarn`

<h1>Set up jest</h1>

install jest cli: `npm install jest --global`
package.json add two line:
<pre>
"scripts": {
 "jest": "jest",
 "jest:coverage": "jest --coverage",
 "jest:watch": "jest --watch"
}
</pre>
after install jest done you will create jest.config.js in root project
<pre>
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => ({
  verbose: true,
});
</pre>

link sample `https://jestjs.io/docs/setup-teardown`

you can test jest: run `npm run jest`

<h1>Setting Up ESLint start step 2:</h1>
<br>Install eslint global:
<br>run `npm --global add eslint` 
<br>After install global you need run `set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

<h3>Continues set up<h3>

`https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code`

After set up eslint done, you will create an .eslintrc.json in root project follow command 
<pre>
cd your project
run `eslint --init`
</pre>
<br>re-step 2 follow link `https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code`

After init eslintrc.json, in package.json you need add two line in scripts:
<pre>
"scripts": {
"lint": "eslint .",
"lint:fix": "eslint --fix --ext .js,.jsx ."
}
</pre>

You can test run `npm run lint`

#How to test sdk:
 SDK only test on device mobile so you need to run native app from repo https://ci_git.mcredit.com.vn/bnpl/bnpl-mobile