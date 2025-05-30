import { UseCaseError } from '@/core/errors/error-use-case'

export class ResourceNotFound extends Error implements UseCaseError {
  constructor(resourceType: string, resourceCredential: string) {
    super(`"${resourceType}" with "${resourceCredential}" not found `)
  }
}
