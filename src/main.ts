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
  const gitHubOptions = {
    baseUrl: core.getInput('github-api-url')
  }
  if (token) {
    return github.getOctokit(token, gitHubOptions)
  } else {
    core.warning(
      'No token set, you may experience rate limiting. Set "token: ${{ secrets.GITHUB_TOKEN }}" if you have problems.'
    )
    return new GitHub(gitHubOptions)
  }
}

async function run(): Promise<void> {
  try {
    const octokit = createOctokit()
    const releasesService = GitHubReleasesService.create(octokit, {
      repo: {owner: 'jbrunton', repo: 'gflows'},
      assetName: getAssetName
    })
    const installer = Installer.create(releasesService)

    const app = {name: 'gflows', version: core.getInput('version')}
    return await installer.installApp(app)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getAssetName(platform: string): string {
  switch (platform) {
    case 'win32':
      throw new Error(`Unsupported OS: Windows`)
    case 'darwin':
      return 'gflows-darwin-amd64'
    default:
      return 'gflows-linux-amd64'
  }
}

run()
