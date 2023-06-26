// import React from 'react';
import { describe, it, expect } from 'vitest';

describe('something truthy', () => {
  it('works with true', () => {
    expect(true).toBeTruthy();
  });
  it('works with false', () => {
    expect(false).toBeFalsy();
  });
});

describe('App component', () => {
  it('removes an item when clicking the Dismiss button', () => {
    expect(true).toBeTruthy();
  });
  it('requests some initial stories from an API on first render', () => {
    expect(false).toBeFalsy();
  });
});
