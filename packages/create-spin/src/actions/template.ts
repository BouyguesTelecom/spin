import type { Context } from './context'
import { color } from '@astrojs/cli-kit'
import fs from 'node:fs'
import path from 'node:path'
import { error, info, spinner, title } from '../messages.js'
import { rimraf } from 'rimraf'
import * as jsYaml from 'js-yaml'
import { cloneGitRepository } from './git.js'
import { downloadTemplate } from 'giget'

interface ValuesInterface {
  name: string
}

export async function template(ctx: Pick<Context, 'template' | 'prompt' | 'dryRun' | 'exit'>) {
  if (!ctx.template) {
    const { template: template } = await ctx.prompt({
      name: 'template',
      type: 'select',
      label: title('template'),
      message: 'How would you like to start your new project?',
      initial: 'ssr-astro-react',
      choices: [
        { value: 'csr-astro-react', label: 'Astro Frontend app (Astro React CSR)', hint: '(recommended)' },
        { value: 'csr-micro-frontend-react', label: 'React Frontend app (React CSR)' },
        { value: 'micro-frontend-es', label: 'Pure VanillaJS frontend app (VanillaJS)' },
        { value: 'micro-frontend-shell', label: 'Shell App (Shell)' },
        { value: 'ssg-next', label: 'Next Frontend app ( Next SSG )' },
        { value: 'ssr-next', label: 'Next Frontend app ( Next SSR )' },
        { value: 'ssr-remix', label: 'Remix Frontend app ( Remix js SSR )' },
        { value: 'ssr-astro-react', label: 'Astro Frontend app (Astro React SSR)' },
        { value: 'static-caddy', label: 'Static website (with Caddy)' },
        { value: 'static-nginx', label: 'Static website (with nginx)' },
        { value: 'minimal', label: 'Empty' },
      ],
    })
    ctx.template = template
  } else {
    await info('template', `Using ${color.reset(ctx.template)}${color.dim(' as project template')}`)
  }

  if (ctx.dryRun) {
    await info('--dry-run', `Skipping template copying`)
  } else if (ctx.template) {
    await spinner({
      start: 'Template copying...',
      end: 'Template copied',
      while: () =>
        copyTemplate(ctx.template!, ctx as Context).catch((e) => {
          if (e instanceof Error) {
            error('error', e.message)
            process.exit(1)
          } else {
            error('error', 'Unable to clone template.')
            process.exit(1)
          }
        }),
    })
  } else {
    ctx.exit(1)
  }
}

const FILES_TO_REMOVE = ['sandbox.config.json', 'CHANGELOG.md']
const FILES_TO_UPDATE = {
  'package.json': (file: string, overrides: { name: string }) =>
    fs.promises.readFile(file, 'utf-8').then((value) => {
      // Match first indent in the file or fallback to `\t`
      const indent = /(^\s+)/m.exec(value)?.[1] ?? '\t'
      fs.promises.writeFile(
        file,
        JSON.stringify(
          Object.assign(JSON.parse(value), Object.assign(overrides, { private: undefined })),
          null,
          indent,
        ),
        'utf-8',
      )
    }),
}

function getTemplateTarget(template: string, ref = 'latest') {
  const isThirdParty = template.includes('/')
  if (isThirdParty) return template

  return `github:BouyguesTelecom/spin/examples/${template}`
}

export default async function copyTemplate(template: string, ctx: Context) {
  const templateTarget = getTemplateTarget(template, ctx.ref)
  const newChartName = ctx.projectName || 'app'

  const helmsPath = path.join(ctx.cwd, `helms/${newChartName}`)

  if (template) {
    const isInsideCurrentDir = path.resolve(templateTarget).startsWith(path.resolve(ctx.cwd))
    if (isInsideCurrentDir) {
      throw new Error('Cannot copy template inside the current directory.')
    }

    try {
      if (fs.existsSync(ctx.cwd)) {
        await rimraf(ctx.cwd)
      }

      await downloadTemplate(templateTarget, {
        force: true,
        provider: 'github',
        cwd: ctx.cwd,
        dir: '.',
      })

      await downloadTemplate(`github:BouyguesTelecom/spin/helms`, {
        force: true,
        provider: 'github',
        cwd: ctx.cwd,
        dir: `helms/${newChartName}`,
      })

      if (ctx.additionalTemplate) {
        const valuesPath = path.join(helmsPath, 'values.yaml')
        fs.readFile(valuesPath, 'utf8', (err, data) => {
          if (err) return console.log(err)
          const result = data.replace(/tag:/g, 'tag: __VERSION_GATEWAY__')
          fs.writeFile(valuesPath, result, 'utf8', function(err) {
            if (err) return console.log(err)
          })
        })
        await cloneGitRepository({ url: ctx.additionalTemplate, ctx })
      }

      const valuesFilePath = path.join(helmsPath, 'Chart.yaml')
      const valuesFileContent = fs.readFileSync(valuesFilePath, 'utf-8')
      const valuesData = jsYaml.load(valuesFileContent) as ValuesInterface

      if (valuesData && valuesData.name) {
        valuesData.name = newChartName
        const updatedValuesContent = jsYaml.dump(valuesData, { indent: 2 }) // Utilisez jsYaml.dump au lieu de jsYaml.safeDump

        fs.writeFileSync(valuesFilePath, updatedValuesContent, 'utf-8')
      }
    } catch (error: any) {
      throw new Error(`Error downloading template: ${error.message}`)
    }
  }

  if (!ctx.dryRun) {
    if (fs.readdirSync(ctx.cwd).length === 0) {
      throw new Error(`Template ${color.reset(template)} ${color.dim('is empty!')}`)
    }

    // Post-process in parallel
    const removeFiles = FILES_TO_REMOVE.map(async (file) => {
      const fileLoc = path.resolve(path.join(ctx.cwd, file))
      if (fs.existsSync(fileLoc)) {
        return fs.promises.rm(fileLoc, { recursive: true })
      }
    })
    const updateFiles = Object.entries(FILES_TO_UPDATE).map(async ([file, update]) => {
      const fileLoc = path.resolve(path.join(ctx.cwd, file))
      if (fs.existsSync(fileLoc)) {
        return update(fileLoc, { name: ctx.projectName! })
      }
    })

    await Promise.all([...removeFiles, ...updateFiles])
  }
}
