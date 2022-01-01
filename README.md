# NPM Git Version Tagger

> This package no longer functions because the NPM API no longer returns the gitHead attribute; maintenance is discontinued.

Automatically add git version tags to NPM package repositories.

Works for repositories in registry `https://registry.npmjs.org/`.

## Usage

Install the CLI globally:

```
npm install -g npm-git-version-tagger
```

Navigate to a local git repository corresponding to an NPM package with release history.

Run the CLI to add tags to the local repository:

```
npm-git-version-tagger
```

Follow the printed instructions to push tags to a remote repository:

```
git push --tags
```
