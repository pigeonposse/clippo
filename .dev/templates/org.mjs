import { joinUrl } from '@clippo/config/core'

import { collectiveImgLInks } from './links.mjs'

export const org = pkg => `## 👨‍💻 Development

**${pkg.extra.productName.toUpperCase()}** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](${joinUrl( pkg.repository.url, '/issues' )})
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](${joinUrl( pkg.repository.url, '/pulls' )})
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](${pkg.homepage})

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](${pkg.funding.url})

## 📜 License

This software is licensed with **[${pkg.license}](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*${pkg.extra.collective.name}* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](${pkg.extra.collective.gh})

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="${pkg.author.url}.png?size=72" alt="${pkg.author.name}" style="border-radius:100%"/> | ${pkg.author.name} |   Author & Development   | [@${pkg.author.name}](${pkg.author.url}) |
| <img src="https://github.com/${pkg.extra.collective.name}.png?size=72" alt="${pkg.extra.collective.name}" style="border-radius:100%"/> | ${pkg.extra.collective.name} | Collective | [@${pkg.extra.collective.name}](https://github.com/${pkg.extra.collective.name}) |

<br>
<p align="center">

${collectiveImgLInks( pkg )}

</p>`

