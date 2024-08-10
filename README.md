# Blog Counter

Simple old school SVG hit counter for the static blog.

## Tech Stack

* Bun
* SQLite
* Ansible

## Development

Install dependencies:

```bash
bun install
```

Run development server:

```bash
bun run watch
```

Run production server:

```bash
bun start
```

Database path could be provided via `DB_PATH` environment variable.

Build for production:

```bash
bun run build
```

Then run the executable:

```bash
./dist/blog-counter
```

## License

Code is distributed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 only.

<img src="./AGPLv3_Logo.svg" width="100" alt="AGPLv3 Logo"/>
