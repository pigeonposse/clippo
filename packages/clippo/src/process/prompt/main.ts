import Enquirer from 'enquirer'

type QuestionsType = Parameters<typeof enquirer.prompt>[0];

const enquirer = new Enquirer()

/**
 * Ask questions to user with prompt function.
 *
 * @param   {QuestionsType} props - PromptOptions.
 * @returns {Promise<*>}          - Promise resolving to answers.
 * @example
 *
 */
export default async ( props: QuestionsType ) => enquirer.prompt( props )
