## Developing

To run project:
```
npm run dev
```

You will need to add environmental variables in your local `.env` file:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ALPHA_VANTAGE_API_KEY=XXXX
```

`NEXT_PUBLIC_BASE_URL` is your host. In development, it will almost always be `localhost:3000`. In production environments, it should point to whatever address the project is hosted behind.

`ALPHA_VANTAGE_API_KEY` is your [API key from AlphaVantage](https://www.alphavantage.co/support/#api-key).

To build the project, you'll need to start the server using `npm run dev` before running
```
npm run build
```

This is because during the build process, Next.js attempts to prerender pages and may try to fetch data from your API routes (ex. `/api/stocks/all`). However, these API routes are only available when the development server is running. If the server is not running, any fetch requests to these endpoints will fail, causing the build to error out. By starting the server before building, you ensure that all API endpoints are accessible during the build and prerendering steps.

In production, you should avoid fetching from your own API routes during static generation. Instead, import data directly or use client-side fetching where appropriate.

## Developer Notes & Thoughts

#### Styling
I didn't know what styling library I should be using for this exercise. NextJS has the option of shipping with Tailwind and I setup the project with it, but I ended up reverting back to SASS to keep it plain and simple for people who are use to the more basic form of stylesheet building.

I would have liked to add aliases to access the `/constants/styles.scss` file but it isn't supported in nativs SASS.

#### Additional Features
If I had the time, I would add:
- Translations: Maybe using i18next.
- More accessibility: Things like better keyboard navigation, screen reading, zooming, color constrast, etc...


#### Struggles & Time Constrains
- The response structure returned from AlphaVantage is unusual. For example, they use exclusively camelCase for their key/value pairs? Half-way through using the data, I thought that I should have used a presenter to convert the data keys into more appropriate snake_case. The presenter would have also let me re-assign `null` values to `'N/A'` strings.

- In the requirements for the stock details page, I was asked to list the 'asset type' but I'm unsure what that field is, so I skipped it. In normal circumstances, I'd be able to bring this up with a project manager or someone with deep knowledge of the project.
