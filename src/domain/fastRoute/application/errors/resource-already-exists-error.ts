import { UseCaseError } from '@/core/errors/error-use-case'

export class ResourceAlreadyExists extends Error implements UseCaseError {
  constructor(resourceType: string, resourceCredential: string) {
    super(`"${resourceType}" with "${resourceCredential}" already exists`)
  }
}
