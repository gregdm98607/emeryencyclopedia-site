/**
 * Part color mapping and utility functions
 */

export interface Part {
  number: number;
  label: string;
  description: string;
  color: string;
}

export const PARTS: Record<number, Part> = {
  1: {
    number: 1,
    label: 'Foundations',
    description: 'Natural landscape: geology, climate, flora, fauna, and night skies',
    color: '#D4A574' // sandstone
  },
  2: {
    number: 2,
    label: 'Peoples',
    description: 'Indigenous cultures: Ancestral Puebloans, Fremont, Ute, Paiute, Shoshone, Navajo',
    color: '#C85A54' // mesa-red
  },
  3: {
    number: 3,
    label: 'Settlement',
    description: 'Mormon colonization, mining, communities, infrastructure, and land use',
    color: '#1A1A2E' // coal-seam
  },
  4: {
    number: 4,
    label: 'Culture & Identity',
    description: 'Arts, foodways, oral histories, celebrations, and notable people',
    color: '#4A6741' // forest-green
  },
  5: {
    number: 5,
    label: 'Field Guide',
    description: 'Scenic drives, hiking, photography, natural wonders, and wildlife',
    color: '#5B8AC5' // sky-blue
  },
  6: {
    number: 6,
    label: 'Resources',
    description: 'Practical information, glossary, bibliography, and index',
    color: '#8B6F47' // canyon-bronze
  }
};

/**
 * Get the accent color for a given part number
 */
export function getPartColor(partNumber: number): string {
  return PARTS[partNumber]?.color || '#1A1A2E';
}

/**
 * Get part information by number
 */
export function getPartInfo(partNumber: number): Part | undefined {
  return PARTS[partNumber];
}

/**
 * Get all parts
 */
export function getAllParts(): Part[] {
  return Object.values(PARTS).sort((a, b) => a.number - b.number);
}

/**
 * Get the label for a given part number
 */
export function getPartLabel(partNumber: number): string {
  return PARTS[partNumber]?.label || 'Unknown';
}
