const STORAGE_KEY = 'auth';

type PersistedAuth = {
  token: string | null;
};

export function loadAuth(): PersistedAuth {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null };
    const parsed = JSON.parse(raw) as Partial<PersistedAuth>;
    return { token: parsed.token ?? null };
  } catch {
    return { token: null };
  }
}

export function saveAuth(next: PersistedAuth) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures (private mode, full quota, etc.)
  }
}
