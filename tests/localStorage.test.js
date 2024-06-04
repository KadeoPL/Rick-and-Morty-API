import { describe, it, expect } from 'vitest';

const localStorageMock = (function() {
    let store = {};
  
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
      clear: function() {
        store = {};
      }
    };
  })();
  
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  describe('Localstorage', () => {
    it('saved value to localStorage'), () => {
        const key = 'testKey';
        const value = 'testValue';
  
        localStorage.setItem(key, value);
  
        expect(localStorage.getItem(key)).toBe(value);
    }

    it('clear value from localStorage'), () => {
        const key = 'testKey';
        const value = 'testValue';
      
        localStorage.setItem(key, value);
        localStorage.removeItem(key);
      
        expect(localStorage.getItem(key)).toBe(null);
    }

    it('clear localStorage'), () => {
        const key = 'testKey';
        const value = 'testValue';
      
        localStorage.setItem(key, value);
        localStorage.clear();
      
        expect(localStorage.getItem(key)).toBe(null);
    }
  })
  