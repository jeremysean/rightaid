/* RightAid runtime configuration
 * ---------------------------------------------------------------------------
 * Set API_BASE to your deployed FastAPI backend to run RightAid as a live app
 * (e.g. "https://rightaid-api.azurewebsites.net" or "http://localhost:8000").
 *
 * Leave it empty ("") to run as a self-contained static demo backed by the
 * local synthetic-data layer (js/data.js) — useful for Netlify previews.
 *
 * You can also override this at runtime without editing the build:
 *   • append ?api=https://your-backend  to any URL (persisted to localStorage)
 *   • set localStorage "rightaid_api_base" in the browser console
 */
window.RIGHTAID_CONFIG = {
  API_BASE: ""
};
