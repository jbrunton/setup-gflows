# setup-gflows

[![build](https://github.com/jbrunton/setup-gflows/workflows/build/badge.svg?branch=develop)](https://github.com/jbrunton/setup-gflows/actions?query=branch%3Adevelop+workflow%3Abuild)
[![release](https://github.com/jbrunton/setup-gflows/workflows/release/badge.svg)](https://github.com/jbrunton/setup-gflows/actions?query=workflow%3Arelease)

A Github Action to install [GFlows – GitHub Workflow Templates](https://github.com/jbrunton/gflows).

## Usage

```yaml
steps:
- uses: jbrunton/setup-gflows@v1
- run: gflows check
```

`setup-gflows` uses the GitHub API to find information about latest releases. To avoid [rate limits](https://developer.github.com/v3/#rate-limiting) it is recommended you pass a [token](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token):

```yaml
steps:
- uses: jbrunton/setup-gflows@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
- run: gflows check
```

To use a specific version:

```yaml
steps:
- uses: jbrunton/setup-gflows@v1
  with:
    version: 0.1.0
    token: ${{ secrets.GITHUB_TOKEN }}
```
