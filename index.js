#!/usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import ejs from 'ejs'
import fs from 'fs-extra'
import { createSpinner } from 'nanospinner'
import path from 'path'
import { darajaApis, frameworks } from './utils/contents.js'
import { askAPIs, askFramework, askProjectName } from './utils/prompts.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

async function newCLI() {
    program
        .version('0.0.3')
        .description('A simple command-line tool to create m-pesa daraja app')

    program
        .argument('[appname]')
        .description('Create a new daraja app template')
        .action(async (appname) => {
            let resolvedAppName = appname

            if (!appname) resolvedAppName = await askProjectName()

            console.log(resolvedAppName)

            const framework = await askFramework()

            const darajaApi = await askAPIs()

            const frameworkPath = frameworks.find(
                (f) => f.label === framework
            ).value

            const darajaApiPath = darajaApis.find(
                (api) => api.label === darajaApi
            ).value

            const spinner = createSpinner({
                text: `Copying files into ${chalk.gray(resolvedAppName)} ...`,
            }).start()

            const templatePath = path.join(
                process.cwd(),
                'templates',
                `mpesa-${frameworkPath.toLowerCase()}-${darajaApiPath.toLowerCase()}`
            );   
            
                    
            const outputPath = path.join(process.cwd(), resolvedAppName)

            // Copy template files to the new app directory
            fs.copySync(templatePath, outputPath)

            // Process and render template files
            const templateFiles = fs.readdirSync(outputPath)
            templateFiles.forEach((file) => {
                const filePath = path.join(outputPath, file)
                if (fs.statSync(filePath).isFile()) {
                    const templateContent = fs.readFileSync(filePath, 'utf-8')
                    const renderedContent = ejs.render(templateContent, {
                        appname: resolvedAppName,
                        api: darajaApi,
                        framework,
                    })
                    fs.writeFileSync(filePath, renderedContent, 'utf-8')
                }
            })

            spinner.success({
                text: `Copied files into ${chalk.gray(resolvedAppName)}`,
            })

            console.log(`
            Next Steps:
                - Run ${chalk.green(`cd ${resolvedAppName}`)}
                - Read the ${chalk.green('README.md')} file for
                more information on how to get started
            `)
        }).re

    program.parse(process.argv)
}

await newCLI()
