import { describe, it, expect } from 'vitest';
import { showPrevButton } from '../main.js'

describe('showPrevButton', () => {
    it('should change display style'), () => {
        const lastCharacterId = 6;

        showPrevButton(lastCharacterId);

        expect(prevButton.style.display).toBe('block');
    }
})