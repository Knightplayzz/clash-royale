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

# Documentation

## Introduction

Provides an easy way to get started with the [Clash Royale API](https://developer.clashroyale.com)
For more information about the responses please check [Official Clash Royale Dev Website](https://developer.clashroyale.com/#/documentation). Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install clashroyale.js`

## Usage

All fetches return a promise using [request-promise](https://www.npmjs.com/package/request-promise)

## Instantiation

In order to get started with Clash of Clans API, you need to create an account at [developer.clashroyale.com](https://developer.clashroyale.com). Then go "My Account" and press on "Create New Key". Fill in the name, description and IP address and copy the key. This is the key that we are later going to use to authenticate you.

Once you get your token and have installed the module. Require the package into you file using ``require()`` and call the login function.

Example:

```javascript
const client = require('clashroyale.js');
await client.login('YOUR-TOKEN-HERE');
```

Remember that the ``client.login()`` is an asynchronised function.

# Documentation

## Authentication

### Login

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#login`` |   auth    | Logs the user in |

```javascript
await client.login('YOUR-TOKEN-HERE');
```

## Cards

### Get Cards

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getCards`` |   limit    |  Retrieves all available cards |

```javascript
await client.getCards(limit);
```

## Challenges

### Get Challenges

|  Function   | Description |
|------------|-------------|
| ``#getChallenges``  |  Retrieves all challenges |

```javascript
await client.getChallenges();
```

## Global Tournaments

### Get Global Tournaments

|  Function   | Description |
|------------|-------------|
| ``#getGlobalTournaments``  |  Retrieves all global tournaments |

```javascript
await client.getGlobalTournaments();
```

## Players

### Get Player by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getPlayer`` |   playerTag    |  Retrieves user information by playerTag |

```javascript
await client.getPlayer('PLAYER-TAG-HERE');
```

### Get Player Upcoming Chests by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getPlayerUpcomingChests`` |   playerTag    | Retrieves players upcoming chests by playerTag  |

```javascript
await client.getPlayerUpcomingChests('PLAYER-TAG-HERE');
```

### Get Player Battle Log by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getPlayerBattleLog`` |   playerTag    | Retrieves players battle log  |

```javascript
await client.getPlayerBattleLog('PLAYER-TAG-HERE');
```

## Clans

### Get Clan by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClan`` |   clanTag    |  Retrieves clan information by clanTag |

```javascript
await client.getClan('CLAN-TAG-HERE');
```

## Get Clan Current River Race by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClanCurrentRiverRace`` |   clanTag   | Retrieves clan current river race by clanTag |

```javascript
await client.getClanCurrentRiverRace('CLAN-TAG-HERE');
```

## Get Clan Current War by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClanCurrentWar`` |   clanTag   | Retrieves clan current war by clanTag |

```javascript
await client.getClanCurrentWar('CLAN-TAG-HERE');
```

### Get Clan Members by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanMembers`` |   clanTag, limit   | Retrieves clan members by clanTag |

```javascript
await client.getClanMembers('CLAN-TAG-HERE', limit);
```

### Get Clan Warlog by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanWarLog`` |   clanTag, limit   | Retrieves clan war log by clanTag |

```javascript
await client.getClanWarLog('CLAN-TAG-HERE', limit);
```

### Get Clan River Race Log by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanRiverRaceLog`` |   clanTag, limit   | Retrieves clan river race log by clanTag |

```javascript
await client.getClanRiverRaceLog('CLAN-TAG-HERE', limit);
```

### Search Clan

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#searchClan`` |   name, locationId, minMembers, maxMembers, minScore, limit   |  Retrieves clans based on search results |

```javascript
await client.searchClan(name, locationId, minMembers, maxMembers, minScore, limit);
```

## Locations

## INPUT

| Name      | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| auth      | string  |   True   | The Authentication Token granted by [developer.clashroyale.com](https://developer.clashroyale.com/)
| clanTag   | string  |   True   | The tag of the clan. Found in clan setting. |
| playerTag | string  |   True   | The tag of a player. Found in player's profile.  |
| limit     | number  |   False  | Limit the number of items returned in the response. ``#searchClan`` limit is required due to many records.|
| minMembers| number  |   False  | The minimum members that are in the clan. |
| maxMembers| number  |   False  | The maximum members that are in the clan. |
| minClanScore| number|   False  |  The minimum clan score that the clan has.|

## OUTPUT

| Name     | Type    | Optional | Description     |
|----------|---------|----------|-----------------|

## MORE OUTPUT DATA

For more output data please check the [Official Clash Royale Dev Website](https://developer.clashroyale.com/#/documentation).

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it.
