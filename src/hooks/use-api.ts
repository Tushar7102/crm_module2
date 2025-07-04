import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface ApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
  dependencies?: any[];
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
}

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Simple in-memory cache
const cache: Record<string, CacheItem<any>> = {};

/**
 * Custom hook for handling API requests with loading, error states and caching
 * @param fetchFn The async function that makes the API request
 * @param options Configuration options for the API request
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useApi<T>(
  fetchFn: () => Promise<T>,
  options: ApiOptions<T> = {}
): ApiState<T> {
  const {
    onSuccess,
    onError,
    enabled = true,
    dependencies = [],
    cacheKey,
    cacheDuration = 5 * 60 * 1000, // 5 minutes default cache duration
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Check if we have cached data
  useEffect(() => {
    if (cacheKey && cache[cacheKey]) {
      const cachedItem = cache[cacheKey];
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - cachedItem.timestamp < cacheDuration) {
        setData(cachedItem.data);
      } else {
        // Remove expired cache
        delete cache[cacheKey];
      }
    }
  }, [cacheKey, cacheDuration]);

  const fetchData = useCallback(async () => {
    // Skip if disabled or already loading
    if (!enabled) return;
    
    // If we have valid cached data, don't fetch again
    if (cacheKey && cache[cacheKey] && 
        Date.now() - cache[cacheKey].timestamp < cacheDuration) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      
      // Cache the result if cacheKey is provided
      if (cacheKey) {
        cache[cacheKey] = {
          data: result,
          timestamp: Date.now(),
        };
      }
      
      if (onSuccess) onSuccess(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      if (onError) onError(error);
      else toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, enabled, cacheKey, cacheDuration, onSuccess, onError, ...dependencies]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually refetch data
  const refetch = useCallback(async () => {
    // Clear cache for this request if it exists
    if (cacheKey) delete cache[cacheKey];
    await fetchData();
  }, [fetchData, cacheKey]);

  return { data, isLoading, error, refetch };
}

/**
 * Custom hook for handling API mutations (POST, PUT, DELETE, etc.)
 * @param mutationFn The async function that makes the API mutation
 * @param options Configuration options for the API mutation
 * @returns Object containing mutate function, loading state, and error
 */
export function useApiMutation<T, P = any>(
  mutationFn: (params: P) => Promise<T>,
  options: Omit<ApiOptions<T>, 'enabled' | 'dependencies' | 'cacheKey' | 'cacheDuration'> = {}
) {
  const { onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (params: P) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mutationFn(params);
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      if (onError) onError(error);
      else toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn, onSuccess, onError]);

  return { mutate, data, isLoading, error };
}

/**
 * Function to manually clear the entire cache or a specific cache key
 * @param cacheKey Optional specific cache key to clear
 */
export function clearApiCache(cacheKey?: string) {
  if (cacheKey) {
    delete cache[cacheKey];
  } else {
    // Clear all cache
    Object.keys(cache).forEach(key => {
      delete cache[key];
    });
  }
}

export default useApi;