# @bearer/cli

Bearer CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bearer/cli.svg)](https://npmjs.org/package/@bearer/cli)

[![CircleCI](https://circleci.com/gh/Bearer/bearer/packages/cli/tree/master.svg?style=shield)](https://circleci.com/gh/Bearer/bearer/packages/cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/Bearer/bearer/packages/cli?branch=master&svg=true)](https://ci.appveyor.com/project/Bearer/bearer/packages/cli/branch/master)
[![Codecov](https://codecov.io/gh/Bearer/bearer/packages/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/Bearer/bearer/packages/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@bearer/cli.svg)](https://npmjs.org/package/@bearer/cli)
[![License](https://img.shields.io/npm/l/@bearer/cli.svg)](https://github.com/Bearer/bearer/packages/cli/blob/master/package.json)

<!-- toc -->
* [@bearer/cli](#bearer-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @bearer/cli
$ bearer COMMAND
running command...
$ bearer (-v|--version|version)
@bearer/cli/0.114.0 linux-x64 node-v10.15.0
$ bearer --help [COMMAND]
USAGE
  $ bearer COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`bearer autocomplete [SHELL]`](#bearer-autocomplete-shell)
* [`bearer help [COMMAND]`](#bearer-help-command)
* [`bearer invoke FUNCTION_NAME`](#bearer-invoke-function-name)

## `bearer autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ bearer autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ bearer autocomplete
  $ bearer autocomplete bash
  $ bearer autocomplete zsh
  $ bearer autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `bearer help [COMMAND]`

display help for bearer

```
USAGE
  $ bearer help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `bearer invoke FUNCTION_NAME`

invoke Function locally

```
USAGE
  $ bearer invoke FUNCTION_NAME

OPTIONS
  -h, --help       show CLI help
  -p, --path=path
```

_See code: [src/commands/invoke.ts](https://github.com/Bearer/bearer/blob/v0.114.0/src/commands/invoke.ts)_
<!-- commandsstop -->
