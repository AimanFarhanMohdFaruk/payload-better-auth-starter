# Data access layer (DAL)

This folder holds **server-only** functions that talk to Payload (and other server resources). They are the single place for collection queries and domain logic used by the app.

## How it fits together

| Layer              | Location                                                                  | Role                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **DAL**            | `src/lib/dal/<domain>.ts`                                                 | `import 'server-only'`. Async functions: inputs in, typed results out. Uses `getPayload()` etc. No `NextRequest` / `Response`. |
| **Route handlers** | `src/app/api/<resource>/route.ts`                                         | HTTP: parse query/body, auth/session, call DAL, return `NextResponse`, map errors to status codes.                             |
| **API client**     | `src/lib/api/<domain>.ts`                                                 | Browser-safe: `fetch` + JSON parsing + shared errors (`src/lib/api/http.ts`). No React.                                        |
| **Hooks**          | `src/hooks/use-<domain>.ts`                                               | `useQuery` / `useMutation` only; call functions from `lib/api`. Document which query keys mutations invalidate.                |
| **Query client**   | `src/lib/query-client.ts` + `src/components/providers/query-provider.tsx` | App-wide TanStack defaults (e.g. stale time); provider wraps the tree in `src/app/(frontend)/providers.tsx`.                   |
| **UI**             | `src/components/...`                                                      | Mostly presentational: props, layout, call `mutate` / `refetch` from hooks or receive data from parents.                       |

## Two ways to read data

1. **Server Components and metadata** — Import DAL directly (e.g. `listBlogPosts` in `blog-posts.tsx`). Do not `fetch` your own `/api/...` from the server for the same read.
2. **Client components** — Use `lib/api` + TanStack Query hooks (`useBlogPosts`). The browser calls `/api/...`, which uses the same DAL so behaviour stays in sync.

## Example slice (blogs)

- DAL: [`blogs.ts`](./blogs.ts) — `listBlogPosts`
- HTTP: [`src/app/api/blogs/route.ts`](../../app/api/blogs/route.ts)
- Client fetch + keys: [`src/lib/api/blogs.ts`](../api/blogs.ts)
- Hook: [`src/hooks/use-blog-posts.ts`](../../hooks/use-blog-posts.ts)

## Conventions

- One file per domain (`users.ts`, `orders.ts`, …) as the app grows.
- Keep DAL free of UI and of React imports.
- If both RSC and client need the same list/filter logic, it belongs in DAL; routes and `lib/api` stay thin.
