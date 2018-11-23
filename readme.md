<h1 align="center">
  <br>
  <img width="137" src="logo.png" alt="interstice">
  <br>
  <br>
  <br>
</h1>

> Simple NodeJS Icecast/SHOUTcast stream recorder.

[![Build Status](https://travis-ci.org/atask/interstice-cli.svg?branch=master)](https://travis-ci.org/atask/interstice-cli)


## Install

```
$ npm install --global interstice-cli
```


## Usage

```
$ interstice --help

  Usage: cli [options] <url>

  Simple NodeJS Icecast/SHOUTcast stream recorder

  Options:
  -v, --version         output the version number
  -o, --output [dir]    output for recordings (default: "./recordings")
  -p, --proxy [proxy]   proxy (default: null)
  -t, --timeout [ms]    milliseconds until connection timeout (0 will disable) (default: 0)
  -r, --reconnect [ms]  milliseconds until reconnection (implies -t) (default: 4200)
  -h, --help            output usage information
```


## Related

- [interstice](https://github.com/atask/interstice) - API for this module


## License

MIT © Allan Taschini
