// Logout is separate from Refresh Identity: the latter keeps account access.
export async function endPuterSession({ auth, clear, lock }) {
  if (typeof auth?.signOut !== "function")
    throw Error("Puter sign-out is unavailable. Reload Browzen and try again.");
  await clear();
  await auth.signOut();
  if (await auth.isSignedIn())
    throw Error("Puter is still signed in. Try logging out again.");
  await lock();
}
