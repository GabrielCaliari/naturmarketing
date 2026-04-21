/**
 * Utility functions for accessibility compliance
 */

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 * WCAG AA requires minimum 4.5:1 for normal text, 3:1 for large text
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 4.5 : ratio >= 7
}

// Test our brand colors
export const colorTests = {
  // Dark text on light backgrounds
  darkOnLight: meetsWCAGAA('#1A0F08', '#F7F3EE'), // body text
  darkOnWarm: meetsWCAGAA('#1A0F08', '#EDE8E0'), // text on warm bg
  
  // Brand colors
  brownOnLight: meetsWCAGAA('#994f2a', '#F7F3EE'), // brand brown on light
  greenOnLight: meetsWCAGAA('#84936f', '#F7F3EE'), // brand green on light
  
  // White text on dark (for buttons, etc.)
  whiteOnDark: meetsWCAGAA('#FFFFFF', '#1A0F08'), // white on dark
  whiteOnBrown: meetsWCAGAA('#FFFFFF', '#994f2a'), // white on brand brown
}