import inquirer from 'inquirer'
import { frameworks, darajaApis } from './contents.js'

export async function askProjectName() {
    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            default: 'my-daraja-app',
        },
    ])
    return projectName
}

export async function askFramework() {
    const { framework } = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'What language/framework do you want to use?',
            choices: frameworks.map((framework) => framework.label),
            default: frameworks[0].label,
        },
    ])
    return framework
}

export async function askAPIs() {
    const { daraja } = await inquirer.prompt([
        {
            type: 'list',
            name: 'daraja',
            message: 'What Daraja APIs do you want to include?',
            choices: darajaApis.map((api) => api.label),
            default: darajaApis[0].label,
        },
    ])
    return daraja
}
