import type { Filter } from '$lib/constants';
import { writable, type Writable } from 'svelte/store';

export const filters: Writable<Filter[]> = writable([]);
