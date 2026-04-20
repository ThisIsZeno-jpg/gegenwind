import configPromise from '@payload-config'
import { getPayload as getPayloadBase } from 'payload'

let cached: ReturnType<typeof getPayloadBase> | null = null

export async function getPayload() {
  if (!cached) {
    cached = getPayloadBase({ config: configPromise })
  }
  return cached
}
