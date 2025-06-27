![Zaggonaut, a retro-inspired theme for Astro.](./images/README.png)

Zaggonaut is a retro-inspired theme for Astro, built using TypeScript, TailwindCSS, and of course, Astro.

> [!NOTE]  
> Introducing Zaggonaut 2.0!
> This is a complete rewrite of the internal content layer, making use of Astro's new Content Collections feature, among other enhancements.

If you are looking for the original Zaggonaut theme, you can find it [on the v1 branch](https://github.com/RATIU5/zaggonaut/tree/v1).

## Getting Started

[View the demo](https://zaggonaut.dev) or [view the source code](https://github.com/RATIU5/zaggonaut).

Alternatively, you can create a new Astro project with Zaggonaut like this:

```bash
# pnpm
pnpm create astro@latest --template RATIU5/zaggonaut
```

> [!IMPORTANT]  
> Currently, `pnpm` is the only supported package manager due to `npm` throwing peer-dependency conflicts.

## Features

- Content Collections
- Dark & light mode
- Customizable colors
- 100 / 100 Lighthouse score
- Fully accessible
- Fully responsive
- Type-safe
- SEO-friendly

## Customization

The entire theme is fully customizable. The theme is setup a specific way to make it easy to customize.

### Colors

You can customize the colors of the theme by editing the `src/styles/global.css` file.
This file uses Tailwind CSS and CSS variables to customize the colors of the theme.
Zaggonaut uses the following CSS variables:

- `--color-zag-dark`: The dark color of the theme
- `--color-zag-light`: The light color of the theme
- `--color-zag-dark-muted`: The dark color of the theme with a slight opacity
- `--color-zag-light-muted`: The light color of the theme with a slight opacity
- `--color-zag-accent-light`: The light accent color of the theme
- `--color-zag-accent-light-muted`: The light accent color of the theme with a slight opacity
- `--color-zag-accent-dark`: The dark accent color of the theme
- `--color-zag-accent-dark-muted`: The dark accent color of the theme with a slight opacity

### Content Customization

95% of the content you'll want to customize will be located inside the `content` directory. Let's break down the specific files/directories you may want to edit:

- `content/configuration.toml`: This file contains the site configuration, such as metadata, social links, and text content.

- `content/blogs/`: This directory contains your blog posts. Each post is a Markdown file with metadata in the frontmatter at the top.

- `content/projects/`: This directory contains your projects. Each project is a Markdown file also with metadata in the frontmatter.

## Ready To Try?

Check out [the theme website](https://zaggonaut.dev) to give it a spin!