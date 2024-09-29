import { create } from 'zustand';
import axios from 'axios';
import extractKeywords from '@/utils/extractKeywords';
import generateQueries from '@/utils/generateQueries';
import { useStoreError } from "@store/storeError";

interface ObjectivesState {
    objectives: string[];
    setObjectives: (newObjectives: string[]) => void;
    results: any;
    cache: Record<string, any>;
    fetchSearchResults: (objectives: string[], callback: (results: any[]) => void) => void;
}

const useObjectivesStore = create<ObjectivesState>((set, get) => ({
    objectives: [],
    setObjectives: (newObjectives: string[]) => set({ objectives: newObjectives }),
    results: [],
    cache: JSON.parse(localStorage.getItem('objectivesCache') || '{}'), // Load cache from localStorage

    fetchSearchResults: async (objectives: string[], callback) => {
        // Check if the results are already cached
        const cache = get().cache;
        console.log(cache, 'cache')
        const cacheKey = objectives.join('_').toLowerCase();
        if (cache[cacheKey]) {
            set({ results: cache[cacheKey] });
            callback(cache[cacheKey]);
            return;
        }

        // if not cached, fetch the results for each objective
        const fetchResults = objectives.map(async (objective) => {
            const keywords = extractKeywords(objective);
            const query = generateQueries(keywords).join(' ');

            // Make request to the proxy server instead of SerpApi directly
            const apiUrl = `http://localhost:5000/search`;

            try {
                const response = await axios.get(apiUrl, { params: { q: query } });
                const searchResults = response.data.organic_results;
                const resultsWithImages = searchResults.map((result: any) => ({
                    title: result.title,
                    link: result.link,
                    image: result.thumbnail || 'https://via.placeholder.com/300',  // Placeholder if no image is found
                }));

                return resultsWithImages;
            } catch (error: Error | any) {
                console.error('Error fetching DuckDuckGo search results:', error);
                const setError = useStoreError.getState().setError;
                setError(error.response?.data?.message || error.response?.data || error?.message);
                return [];
            }
        });
        const results = await Promise.all(fetchResults);
        const flatResults = results.flat();

        // If results Cache and persist the results in localStorage and go home
        if (flatResults.length) {
            set((state) => {
                const updatedCache = { ...state.cache, [cacheKey]: flatResults };
                localStorage.setItem('objectivesCache', JSON.stringify(updatedCache)); // Save cache to localStorage
                return {
                    cache: updatedCache,
                    results: flatResults,
                };
            });
        }

        callback(flatResults);
    },
}));

export { useObjectivesStore };































// import { create } from 'zustand';
// import axios from 'axios';
// import extractKeywords from '@/utils/extractKeywords';
// import generateQueries from '@/utils/generateQueries';
// import { useStoreError } from "@store/storeError";

// interface ObjectivesState {
//     objectives: string[];
//     setObjectives: (newObjectives: string[]) => void;
//     fetchSearchResults: (objectives: string[], callback: () => void) => void;
//     results: any;
// }

// const useObjectivesStore = create<ObjectivesState>((set) => ({
//     objectives: [],
//     setObjectives: (newObjectives: string[]) => set({ objectives: newObjectives }),
//     results: [],
//     fetchSearchResults: async (objectives: string[], callback) => {
//         const fetchResults = objectives.map(async (objective) => {
//             const keywords = extractKeywords(objective);
//             const query = generateQueries(keywords);

//             const apiKey = 'YOUR_BING_WEB_SEARCH_API_KEY';
//             const imageApiKey = 'YOUR_BING_IMAGE_SEARCH_API_KEY';
//             const searchApiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query.join(" "))}`;
//             const imageApiUrl = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(objective)}`;

//             const headers = {
//                 'Ocp-Apim-Subscription-Key': apiKey,
//             };

//             const imageHeaders = {
//                 'Ocp-Apim-Subscription-Key': imageApiKey,
//             };

//             try {
//                 // Fetch search results
//                 const searchResponse = await axios.get(searchApiUrl, { headers });
//                 const searchResults = searchResponse.data.webPages.value;

//                 // Fetch images
//                 const imageResponse = await axios.get(imageApiUrl, { headers: imageHeaders });
//                 const imageResults = imageResponse.data.value;

//                 // Attach the first image (or default if no image found) to each search result
//                 const resultsWithImages = searchResults.map((result: any, index: number) => ({
//                     ...result,
//                     image: imageResults[index]?.thumbnailUrl || 'default-image-url', // Use a default image if no match is found
//                 }));

//                 return resultsWithImages;
//             } catch (error: Error | any) {
//                 console.error('Error fetching search or image results:', error);
//                 const setError = useStoreError.getState().setError;
//                 setError(error.response?.data?.message || error.response?.data || error?.message);
//                 return [];
//             }
//         });

//         const results = await Promise.all(fetchResults);
//         set({ results: results.flat() }); // Flatten the results and update state

//         callback();
//     },
// }));


// export { useObjectivesStore };