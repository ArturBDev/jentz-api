import { simpleGit } from 'simple-git'

export const getGitRoot = async (): Promise<string> => {
  const git = simpleGit()
  const response = await git.raw(['rev-parse', '--show-toplevel'])
  return response.trim()
}

export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
