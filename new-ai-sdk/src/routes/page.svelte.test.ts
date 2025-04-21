import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', { skip: true }, () => {
		render(Page);
		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
	});

	// Test by sahil
	test('should contain text "new-ai-sdk"', () => {
		render(Page);
		expect(screen.getByText('new-ai-sdk')).toBeInTheDocument();
	});
});
