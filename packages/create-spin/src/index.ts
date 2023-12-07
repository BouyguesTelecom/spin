import { getContext } from './actions/context.js'

import { git } from './actions/git.js'
import { help } from './actions/help.js'
import { intro } from './actions/intro.js'
import { projectName } from './actions/project-name.js'
import { template } from './actions/template.js'
import { clearTemplate } from './actions/clear.js'

const exit = () => process.exit(0)
process.on('SIGINT', exit)
process.on('SIGTERM', exit)

// Please also update the installation instructions in the docs at
// https://github.com/withastro/docs/blob/main/src/pages/en/install/auto.md
// if you make any changes to the flow or wording here.
export async function main() {
  // NOTE: In the v7.x version of npm, the default behavior of `npm init` was changed
  // to no longer require `--` to pass args and instead pass `--` directly to us. This
  // broke our arg parser, since `--` is a special kind of flag. Filtering for `--` here
  // fixes the issue so that create-astro now works on all npm versions.
  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')
  const ctx = await getContext(cleanArgv)
  if (ctx.help) {
    help()
    return
  }

  const steps = [
    intro,
    projectName,
    template,

    // Steps which write to files need to go above git
    git,
    clearTemplate
  ]

  for (const step of steps) {
    await step(ctx)
  }
  process.exit(0)
}

export { getContext, git, intro, projectName, template }
