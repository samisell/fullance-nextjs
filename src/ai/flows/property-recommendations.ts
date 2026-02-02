'use server';

/**
 * @fileOverview An AI agent for recommending properties based on user preferences and viewing history.
 *
 * - getPersonalizedPropertyRecommendations - A function that returns a list of recommended property names.
 * - PersonalizedPropertyRecommendationsInput - The input type for the getPersonalizedPropertyRecommendations function.
 * - PersonalizedPropertyRecommendationsOutput - The return type for the getPersonalizedPropertyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPropertyRecommendationsInputSchema = z.object({
  userViewingHistory: z
    .array(z.string())
    .describe('An array of property names the user has viewed.'),
  userPreferences: z
    .string()
    .describe('A description of the users property preferences.'),
  allPropertyNames: z
    .array(z.string())
    .describe('An array of all available property names.'),
});
export type PersonalizedPropertyRecommendationsInput = z.infer<
  typeof PersonalizedPropertyRecommendationsInputSchema
>;

const PersonalizedPropertyRecommendationsOutputSchema = z.object({
  recommendedProperties: z
    .array(z.string())
    .describe('An array of recommended property names.'),
});
export type PersonalizedPropertyRecommendationsOutput = z.infer<
  typeof PersonalizedPropertyRecommendationsOutputSchema
>;

export async function getPersonalizedPropertyRecommendations(
  input: PersonalizedPropertyRecommendationsInput
): Promise<PersonalizedPropertyRecommendationsOutput> {
  return personalizedPropertyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPropertyRecommendationsPrompt',
  input: {schema: PersonalizedPropertyRecommendationsInputSchema},
  output: {schema: PersonalizedPropertyRecommendationsOutputSchema},
  prompt: `You are an expert real estate agent specializing in property recommendations.

Based on the user's viewing history and preferences, recommend properties from the list of available properties.

User Viewing History: {{userViewingHistory}}
User Preferences: {{userPreferences}}
Available Properties: {{allPropertyNames}}

Only return property names that the user has not already viewed.
Return the recommendations as a list of property names.

Make sure that the properties are sufficiently similar, and don't return properties that are very different from what the user has viewed or expressed interest in.  With the limited training data, take extra care to make sure results are relevant.  In cases where there are less than 3 good recommendations, return all possible recommendations.
`,
});

const personalizedPropertyRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedPropertyRecommendationsFlow',
    inputSchema: PersonalizedPropertyRecommendationsInputSchema,
    outputSchema: PersonalizedPropertyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
