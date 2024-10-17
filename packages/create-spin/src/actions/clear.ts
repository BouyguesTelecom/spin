import type { Context } from './context'
import path from 'node:path'
import { rimraf } from 'rimraf'

export function clearTemplate(ctx: Pick<Context, 'cwd' | 'git' | 'yes' | 'prompt' | 'dryRun'>) {
  const additionalTemplateFolderPath = path.resolve(ctx.cwd, 'additionalTemplateFolder')
  rimraf.sync(additionalTemplateFolderPath)
}
