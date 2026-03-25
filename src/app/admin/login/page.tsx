import { login } from './actions'

export default async function LoginPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams
  const message = searchParams?.message as string

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md rounded-lg bg-zinc-900 mx-auto px-8 py-10 shadow-lg border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Admin Login</h1>
        
        {message && (
          <div className="mb-4 rounded bg-red-900/50 p-3 text-red-200 text-sm border border-red-800">
            {message}
          </div>
        )}

        <form className="flex-1 flex flex-col w-full justify-center gap-4 text-zinc-300">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 mb-2 text-white"
            name="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 mb-6 text-white"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <button
            formAction={login}
            className="bg-white hover:bg-zinc-200 text-black rounded-md px-4 py-3 font-semibold mb-2 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
