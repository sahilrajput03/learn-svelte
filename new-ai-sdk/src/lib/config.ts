import { env } from '$env/dynamic/private';

export const isAppleSystem = env.USER === 'apple'

export const mcpDirectoryOnAppleSystem = "/Users/apple/Documents/test/mcp-filesystem-test1/p1/"
export const mcpDirectoryOnLinodeSystem = "/home/user1/Documents/github_repos/prod-qr-solution-backend/source/.ignored/test-notes/"
export const directoryForMcp = isAppleSystem ? mcpDirectoryOnAppleSystem : mcpDirectoryOnLinodeSystem
