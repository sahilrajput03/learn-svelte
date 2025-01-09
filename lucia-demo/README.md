# Sahil: Install logs

```bash
 npx sv create
┌  Welcome to the Svelte CLI! (v0.6.10)
│
◇  Where would you like your project to be created?
│  p1
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with Typescript?
│  Yes, using Typescript syntax
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  lucia
│
◇  The lucia add-on requires drizzle to also be setup. Include it?
│  Yes
│
◇  lucia: Do you want to include a demo? (includes a login/register page)
│  Yes
│
◇  drizzle: Which database would you like to use?
│  SQLite
│
◇  drizzle: Which SQLite client would you like to use?
│  better-sqlite3
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
◆  Successfully setup add-ons
│
◆  Successfully installed dependencies
│
◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd p1                                                                │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Add-on next steps ──────────────────────────────────────────────────╮
│                                                                      │
│  lucia:                                                              │
│  - Run npm run db:push to update your database schema                │
│  - Visit /demo/lucia route to view the demo                          │
│                                                                      │
│  drizzle:                                                            │
│  - You will need to set DATABASE_URL in your production environment  │
│  - Run npm run db:push to update your database schema                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯
│
└  You're all set!
```

# Sahil: On running - `npm run db:push`

```bash
npm run db:push

> p1@0.0.1 db:push
> drizzle-kit push

drizzle-kit: v0.22.8
drizzle-orm: v0.33.0

No config path provided, using default path
Reading config file '/Users/apple/Documents/test/p1/drizzle.config.ts'
[✓] Pulling schema from database...

 Warning  You are about to execute current statements:

CREATE TABLE `session` (
        `id` text PRIMARY KEY NOT NULL,
        `user_id` text NOT NULL,
        `expires_at` integer NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `user` (
        `id` text PRIMARY KEY NOT NULL,
        `age` integer,
        `username` text NOT NULL,
        `password_hash` text NOT NULL
);

CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);

[✓] Changes applied
```

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
