#!/usr/bin/env node

let cp = require('child_process');
let request = require('request');

const REGISTRY = 'https://registry.npmjs.org/';

let package;
try {
  package = require(`${ process.cwd() }/package.json`).name;
} catch (e) {
  console.log('package.json not found in current working directory');
}

let url = `${ REGISTRY }${ package }`;

request(url, function (error, data) {
  if (error) {
    console.log(error);
  } else {
    let body = JSON.parse(data.body);
    let count = 0;

    if (body.error) {
      if (body.error == 'Not found') {
        console.log(`No package ${ package } found in registry ${ REGISTRY }.`);
      } else {
        console.log(body.error);
      }
    } else {
      for (let version in body.versions) {
        let gitHead = body.versions[version].gitHead;

        if (gitHead) {
          console.log(`Adding tag v${ version } to ${ gitHead }.`);
          try {
            cp.execSync(`GIT_COMMITTER_DATE="${ body.time[version] }" git tag v${ version } ${ gitHead } -m "tagged by npm-git-version-tagger"`);
            count++;
          } catch (e) {
            // ignore
          }
        } else {
          console.log(`No gitHead found for version ${ version }; no tags created.`);
        }
      }

      console.log(`Added ${ count } git tags.`);
      console.log('Use `git log` to review changes.');
      console.log('Use `git push --tags` to push tags to remote repository.');
    }
  }
});
