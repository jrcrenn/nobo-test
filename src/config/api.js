const BASE_URL = "https://api.tvmaze.com/search/shows?q=test";

export async function fetchShows() {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchEpisode(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    throw error;
  }
}
