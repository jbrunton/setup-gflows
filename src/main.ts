import {
  Installer,
  GitHubReleasesService,
  Octokit
} from '@jbrunton/gha-installer'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'

function createOctokit(): Octokit {
  const token = core.getInput('token')
  if (token) {
    return github.getOctokit(token)
  } else {
    core.warning(
      'No token set, you may experience rate limiting. Set "token: ${{ secrets.GITHUB_TOKEN }}" if you have problems.'
    )
    return new GitHub()
  }
}

async function run(): Promise<void> {
  try {
    const octokit = createOctokit()
    const releasesService = GitHubReleasesService.create(octokit)
    const installer = Installer.create(releasesService)

    const app = {name: 'gflows', version: core.getInput('version')}
    const repo = {owner: 'jbrunton', repo: 'gflows'}
    return await installer.installApp(app, repo, getAssetName())
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getAssetName(): string {
  switch (process.platform) {
    case 'win32':
      throw new Error(`Unsupported OS: Windows`)
    case 'darwin':
      return 'gflows-darwin-amd64'
    default:
      return 'gflows-linux-amd64'
  }
}

run()
