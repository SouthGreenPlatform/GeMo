/**
 * security.js - Utilitaires de sécurité pour prévenir les failles XSS et injections
 */

/**
 * Échappe les caractères spéciaux HTML
 * @param {string} str - String à échapper
 * @returns {string} String échappée
 */
export function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Crée un élément option de manière sûre
 * @param {string} value - La valeur (attribut value)
 * @param {string} text - Le texte affiché
 * @returns {HTMLOptionElement} Option element sûr
 */
export function createSafeOption(value, text) {
    const option = document.createElement('option');
    option.value = sanitizeHTML(value);
    option.textContent = text; // ✅ textContent = pas de HTML execution
    return option;
}

/**
 * Valide que les données ne contiennent pas d'HTML/Script dangereux
 * @param {any} data - Données à valider
 * @returns {boolean} true si propre, false si suspecte
 */
export function isCleanData(data) {
    if (typeof data === 'string') {
        // Patterns d'attaque courants
        const dangerousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i, // onclick, onerror, etc.
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /eval\s*\(/i,
            /expression\s*\(/i
        ];
        
        return !dangerousPatterns.some(pattern => pattern.test(data));
    }
    
    if (typeof data === 'object' && data !== null) {
        // Valider récursivement les objets
        return Object.values(data).every(v => isCleanData(v));
    }
    
    return true;
}

/**
 * Valide un nom de fichier
 * @param {string} filename - Nom de fichier
 * @returns {boolean} true si valide
 */
export function isValidFilename(filename) {
    if (typeof filename !== 'string' || filename.length === 0) return false;
    
    // Autoriser seulement: lettres, chiffres, points, tirets, underscores
    const validPattern = /^[a-zA-Z0-9._\-]+$/;
    return validPattern.test(filename);
}

/**
 * Valide un nombre (ploidy, etc.)
 * @param {any} value - Valeur à valider
 * @param {number} min - Minimum (optionnel)
 * @param {number} max - Maximum (optionnel)
 * @returns {number|null} Nombre valide ou null
 */
export function validateNumber(value, min = 0, max = 1000) {
    const num = Number(value);
    if (isNaN(num)) return null;
    if (num < min || num > max) return null;
    return num;
}

/**
 * Sanitize les valeurs d'un objet JSON
 * @param {object} obj - Objet à nettoyer
 * @returns {object} Objet avec valeurs échappées
 */
export function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }
    
    const cleaned = {};
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'string') {
            cleaned[key] = sanitizeHTML(value);
        } else if (typeof value === 'object') {
            cleaned[key] = sanitizeObject(value);
        } else {
            cleaned[key] = value;
        }
    });
    return cleaned;
}

/**
 * Valide et nettoie les données JSON du serveur
 * @param {any} data - Données reçues
 * @throws {Error} Si données suspectes
 * @returns {any} Données nettoyées
 */
export function validateServerData(data) {
    if (!isCleanData(data)) {
        throw new Error('⚠️ Données suspectes détectées - possible tentative d\'injection');
    }
    return sanitizeObject(data);
}

/**
 * Échappe une string pour l'utiliser dans un attribut data-*
 * @param {string} str - String à échapper
 * @returns {string} String échappée
 */
export function escapeDataAttribute(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export default {
    sanitizeHTML,
    createSafeOption,
    isCleanData,
    isValidFilename,
    validateNumber,
    sanitizeObject,
    validateServerData,
    escapeDataAttribute
};
