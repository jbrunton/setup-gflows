import {Installer, GitHubReleasesService, Octokit} from '@jbrunton/gha-installer'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'

function createOctokit(): Octokit {
  const token = core.getInput('token');
  if (token) {
    return github.getOctokit(token);
  } else {
    core.warning('No token set, you may experience rate limiting. Set "token: ${{ secrets.GITHUB_TOKEN }}" if you have problems.');
    return new GitHub();
  }
}

  
async function run(): Promise<void> {
  try {
    const octokit = createOctokit()
    const releasesService = GitHubReleasesService.create(octokit)
    const installer = Installer.create(releasesService)
    return await installer.installApp({ name: 'ytt', version: '0.28.0' })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
