<div align="center">
 <img src="https://1000logos.net/wp-content/uploads/2021/04/Clash-Royale-logo.png" height="200px"  alt="Clash Of Clans"/>
 <br>
 <p>A light-weight module that makes <a href="https://developer.clashroyale.com/">Clash Royale API</a> become easy.</p>
 <a href=""><img src="https://app.travis-ci.com/Knightplayzz/clash-royale.svg?branch=main"></a>
 <a href='https://coveralls.io/github/Knightplayzz/clash-royale?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/clash-royale/badge.svg?branch=main' alt='Coverage Status' /></a>
 <a href="https://www.npmjs.com/package/clashroyale.js"><img src="https://img.shields.io/npm/dt/clashroyale.js.svg?maxAge=3600"></a>

<a href="https://www.npmjs.com/package/clashroyale.js"><img src="https://img.shields.io/npm/v/clashroyale.js" alt="Install size"></a>
 <a href="https://packagephobia.now.sh/result?p=clashroyale.js"><img src="https://badgen.net/packagephobia/install/clashroyale.js" alt="Current version"></a>
</div>

# Introduction

Provides an easy way to get started with the [Clash Royale API](https://developer.clashroyale.com)
For more information about the responses please check [Official Clash Royale Dev Website](https://developer.clashroyale.com/#/documentation). Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install clashroyale.js`

## Links

- [Documentation](https://github.com/Knightplayzz/clash-royale/blob/main/documentation.md)
- [Clash Royale Developer Website](https://developer.clashroyale.com/)
- [Clash Royale API Community Discord](https://discord.gg/Eaja7gJ)

## Example

```javascript
const client = require('clash-of-clans-node');
async function myFunction() {
    await client.login('YOUR-TOKEN-HERE');
    const player = await client.getPlayer()
    
}
myFunction();
```

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it.
