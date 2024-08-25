import { joinUrl } from '@clippo/config/core'

export const info = pkg => `- [Documentation](${pkg.homepage})
- [Installation](${joinUrl( pkg.homepage, 'guide/getting-started#installation' )})`

