# node-emails

## File structure

Suggested file structure is placed in folder 'example'.

## Cli commands

```typescript
emails serve // serve emails in browser, watch for changes and reload
emails build // compile and compress templates
emails --help // display documentation
```

## Default config

```typescript
export const defaultConfig: Config = {
  dist: 'dist',
  pages: ['src/pages/**/*.html', '!src/pages/archive/**/*.html'],
  root: 'src/pages',
  layouts: 'src/layouts',
  partials: 'src/partials',
  helpers: 'src/helpers',
  scss: 'src/assets/scss/app.scss',
  images: ['src/assets/img/**/*', '!src/assets/img/archive/**/*'],
};
```

## Custom config

To provide custom config, create emails-config.json file. Custom config will be merged with default one.

```typescript
emails build --config ./emails-config.json // provide custom options
```

### Possible options:

```typescript
{
  dist: string;
  pages: string[];
  root: string;
  layouts: string;
  partials: string;
  helpers: string;
  scss: string;
  images: string[];
}
```
