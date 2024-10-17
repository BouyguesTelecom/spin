import fs from 'node:fs'
import path from 'node:path'
import type { Context } from './context'
import { color } from '@astrojs/cli-kit'
import { execa } from 'execa'
import { error, info, spinner, title } from '../messages.js'
import { rimraf } from 'rimraf'
import ncp from 'ncp'

export async function cloneGitRepository({ url, ctx }: { url: string; ctx: Context }) {
    const additionalTemplateFolderPath = path.join(ctx.cwd, 'additionalTemplateFolder')
    await spinner({
      start: 'Cloning the Git repository...',
      end: 'Git repository cloned',
      while: async () => {
        await execa('git', ['clone', url, '--depth=1', additionalTemplateFolderPath], { stdio: 'ignore' })
        try {
          const gitFolderPath = path.join(additionalTemplateFolderPath, '.git')
          rimraf.sync(gitFolderPath)
        } catch {}
        mergeCopy(additionalTemplateFolderPath, ctx.cwd)
      },
    })
}

function mergeHelmsFiles(
  destinationHelmsTemplatesDir: string,
  sourceHelmsTemplatesDir: string
) {
  ncp(sourceHelmsTemplatesDir, destinationHelmsTemplatesDir, { clobber: true }, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

function mergeCopy(sourceDir: string, destinationDir: string) {
  fs.readdirSync(sourceDir).forEach((item) => {
    const sourcePath = path.join(sourceDir, item)
    const destinationPath = path.join(destinationDir, item)

    switch (true) {
      case fs.statSync(sourcePath).isDirectory() && item === 'helms':
        const destinationHelmTemplate = path
          .join(destinationPath, destinationDir, 'templates')
          .replace(/\/additionalTemplateFolder\//g, '/');

        const destinationChartHelmTemplate = path
          .join(destinationPath, destinationDir)
          .replace(/\/additionalTemplateFolder\//g, '/');

        mergeHelmsFiles(destinationChartHelmTemplate, `${sourcePath}`);
        mergeHelmsFiles(destinationHelmTemplate, `${sourcePath}/templates`);
        break;
      case fs.statSync(sourcePath).isDirectory():
        mergeCopy(sourcePath, destinationPath);
        break;
      case !fs.existsSync(destinationPath):
        fs.copyFileSync(sourcePath, destinationPath);
        break;
      case item === 'package.json':
        const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
        const destinationContent = fs.readFileSync(destinationPath, 'utf-8');
        const sourceJSON = JSON.parse(sourceContent);
        const destinationJSON = JSON.parse(destinationContent);
        const mergedDependencies = Object.assign(destinationJSON.dependencies, sourceJSON.dependencies);
        const mergedContent = Object.assign(destinationJSON, sourceJSON);
        mergedContent.dependencies = mergedDependencies;
        fs.writeFileSync(destinationPath, JSON.stringify(mergedContent, null, 2), 'utf-8');
        break;
      default:
        // For other files, merge them in any way you want (e.g. concatenation)
        // You can customize the merge based on file type
        // ...
        break;
    }
  })
}

export async function git(ctx: Pick<Context, 'cwd' | 'git' | 'yes' | 'prompt' | 'dryRun'>) {
  if (fs.existsSync(path.join(ctx.cwd, '.git'))) {
    await info('Nice!', `Git has already been initialized`)
    return
  }
  let _git = ctx.git ?? ctx.yes
  if (_git === undefined) {
    ;({ git: _git } = await ctx.prompt({
      name: 'git',
      type: 'confirm',
      label: title('git'),
      message: `Initialize a new git repository?`,
      hint: 'optional',
      initial: true,
    }))
  }

  if (ctx.dryRun) {
    await info('--dry-run', `Skipping Git initialization`)
  } else if (_git) {
    await spinner({
      start: 'Git initializing...',
      end: 'Git initialized',
      while: () =>
        init({ cwd: ctx.cwd }).catch((e) => {
          error('error', e)
          process.exit(1)
        }),
    })
  } else {
    await info(
      ctx.yes === false ? 'git [skip]' : 'Sounds good!',
      `You can always run ${color.reset('git init')}${color.dim(' manually.')}`
    )
  }
}

async function init({ cwd }: { cwd: string }) {
  try {
    await execa('git', ['init'], { cwd, stdio: 'ignore' })
    await execa('git', ['add', '-A'], { cwd, stdio: 'ignore' })
    await execa('git', ['commit', '-m', '🎉 Initial commit from Spin'], { cwd, stdio: 'ignore' })
  } catch (e) {}
}
