import { describe, it, expect } from 'vitest';
import {createHtmlElement} from '../main'

describe('createHtmlElement', () => {
    it('should create an element with the correct tag, text content, and class', () => {
        const tagName = 'div';
        const textContent = 'Test content';
        const className = 'test-class';
        
        const element = createHtmlElement(tagName, textContent, className);
        
        expect(element.tagName.toLowerCase()).toBe(tagName);
        expect(element.textContent).toBe(textContent);
        expect(element.classList.contains(className)).toBe(true);
    });
});